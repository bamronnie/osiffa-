const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

// CRC32 implementation
const crcTable = new Uint32Array(256);
for (let n = 0; n < 256; n++) {
  let c = n;
  for (let k = 0; k < 8; k++) {
    c = (c & 1) ? (0xedb88320 ^ (c >>> 1)) : (c >>> 1);
  }
  crcTable[n] = c;
}

function crc32(buf) {
  let c = 0xffffffff;
  for (let i = 0; i < buf.length; i++) {
    c = crcTable[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
  }
  return (c ^ 0xffffffff) >>> 0;
}

function createChunk(type, data) {
  const len = data.length;
  const buf = Buffer.alloc(12 + len);
  buf.writeUInt32BE(len, 0);
  buf.write(type, 4, 4, 'ascii');
  data.copy(buf, 8);
  const crc = crc32(buf.slice(4, 8 + len));
  buf.writeUInt32BE(crc, 8 + len);
  return buf;
}

function processPng(srcFile, destFile) {
  const buf = fs.readFileSync(srcFile);
  let pos = 8;
  let width, height, bitDepth, colorType;
  const idatChunks = [];

  while (pos < buf.length) {
    const len = buf.readUInt32BE(pos);
    const type = buf.toString('ascii', pos + 4, pos + 8);
    const data = buf.slice(pos + 8, pos + 8 + len);
    if (type === 'IHDR') {
      width = buf.readUInt32BE(pos + 8);
      height = buf.readUInt32BE(pos + 12);
      bitDepth = buf.readUInt8(pos + 16);
      colorType = buf.readUInt8(pos + 17);
    } else if (type === 'IDAT') {
      idatChunks.push(data);
    }
    pos += 12 + len;
  }

  console.log('Processing:', srcFile, { width, height, bitDepth, colorType });
  if (colorType !== 6 || bitDepth !== 8) {
    console.error('Expected RGBA 8-bit PNG');
    return;
  }

  const decompressed = zlib.inflateSync(Buffer.concat(idatChunks));
  const bytesPerPixel = 4;
  const stride = width * bytesPerPixel;
  
  // Unfilter PNG scanlines
  const rawData = Buffer.alloc(width * height * bytesPerPixel);
  let srcOffset = 0;
  let destOffset = 0;

  function paethPredictor(a, b, c) {
    const p = a + b - c;
    const pa = Math.abs(p - a);
    const pb = Math.abs(p - b);
    const pc = Math.abs(p - c);
    if (pa <= pb && pa <= pc) return a;
    if (pb <= pc) return b;
    return c;
  }

  for (let y = 0; y < height; y++) {
    const filterType = decompressed[srcOffset++];
    for (let x = 0; x < stride; x++) {
      const rawByte = decompressed[srcOffset++];
      const left = x >= bytesPerPixel ? rawData[destOffset - bytesPerPixel + (x % bytesPerPixel)] : 0;
      const above = y > 0 ? rawData[destOffset - stride + x] : 0;
      const aboveLeft = (y > 0 && x >= bytesPerPixel) ? rawData[destOffset - stride - bytesPerPixel + (x % bytesPerPixel)] : 0;

      let val = rawByte;
      if (filterType === 1) { // Sub
        val = (rawByte + left) & 0xff;
      } else if (filterType === 2) { // Up
        val = (rawByte + above) & 0xff;
      } else if (filterType === 3) { // Average
        val = (rawByte + Math.floor((left + above) / 2)) & 0xff;
      } else if (filterType === 4) { // Paeth
        val = (rawByte + paethPredictor(left, above, aboveLeft)) & 0xff;
      }
      rawData[destOffset + x] = val;
    }
    destOffset += stride;
  }

  // Transform pixels:
  // For dark background: turn dark/black strokes into white/silver (#FFFFFF)
  // Keep purple/magenta vibrant!
  for (let i = 0; i < rawData.length; i += 4) {
    const r = rawData[i];
    const g = rawData[i + 1];
    const b = rawData[i + 2];
    const a = rawData[i + 3];

    if (a < 10) continue; // Transparent

    // Check if pixel is purple/magenta (OSIFFA text and diagonal accent)
    // Purple typically has high R and B, lower G
    const isMagenta = (r > 110 && b > 100 && g < 90);
    const isDark = (r < 90 && g < 90 && b < 90);

    if (isDark) {
      // Convert black/dark to crisp white
      rawData[i] = 255;
      rawData[i + 1] = 255;
      rawData[i + 2] = 255;
      // Keep alpha
    } else if (isMagenta) {
      // Boost the magenta slightly for vibrant pop on dark background
      rawData[i] = Math.min(255, Math.round(r * 1.15));
      rawData[i + 1] = Math.round(g * 0.9);
      rawData[i + 2] = Math.min(255, Math.round(b * 1.15));
    }
  }

  // Re-encode with filter type 0 (None)
  const filteredData = Buffer.alloc(height * (1 + stride));
  let fOffset = 0;
  let rOffset = 0;
  for (let y = 0; y < height; y++) {
    filteredData[fOffset++] = 0; // Filter None
    rawData.copy(filteredData, fOffset, rOffset, rOffset + stride);
    fOffset += stride;
    rOffset += stride;
  }

  const newIdat = zlib.deflateSync(filteredData, { level: 9 });
  
  // Construct PNG
  const pngHeader = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
  const ihdrData = Buffer.alloc(13);
  ihdrData.writeUInt32BE(width, 0);
  ihdrData.writeUInt32BE(height, 4);
  ihdrData.writeUInt8(8, 8); // bit depth
  ihdrData.writeUInt8(6, 9); // RGBA
  ihdrData.writeUInt8(0, 10);
  ihdrData.writeUInt8(0, 11);
  ihdrData.writeUInt8(0, 12);
  const ihdrChunk = createChunk('IHDR', ihdrData);
  const idatChunk = createChunk('IDAT', newIdat);
  const iendChunk = createChunk('IEND', Buffer.alloc(0));

  const outBuf = Buffer.concat([pngHeader, ihdrChunk, idatChunk, iendChunk]);
  fs.writeFileSync(destFile, outBuf);
  console.log('Successfully written:', destFile, 'Size:', outBuf.length);
}

processPng(
  path.join(__dirname, 'components', 'osiffa-logo (1).png'),
  path.join(__dirname, 'components', 'osiffa-logo-dark.png')
);
