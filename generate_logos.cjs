const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

// CRC32 table
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

function encodePng(width, height, rawRgba) {
  const bytesPerPixel = 4;
  const stride = width * bytesPerPixel;
  const filteredData = Buffer.alloc(height * (1 + stride));
  
  let fOffset = 0;
  let rOffset = 0;
  for (let y = 0; y < height; y++) {
    filteredData[fOffset++] = 0; // Filter 0 (None)
    rawRgba.copy(filteredData, fOffset, rOffset, rOffset + stride);
    fOffset += stride;
    rOffset += stride;
  }

  const idatData = zlib.deflateSync(filteredData, { level: 9 });
  const pngHeader = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
  const ihdrData = Buffer.alloc(13);
  ihdrData.writeUInt32BE(width, 0);
  ihdrData.writeUInt32BE(height, 4);
  ihdrData.writeUInt8(8, 8); // 8-bit
  ihdrData.writeUInt8(6, 9); // RGBA
  ihdrData.writeUInt8(0, 10);
  ihdrData.writeUInt8(0, 11);
  ihdrData.writeUInt8(0, 12);

  return Buffer.concat([
    pngHeader,
    createChunk('IHDR', ihdrData),
    createChunk('IDAT', idatData),
    createChunk('IEND', Buffer.alloc(0))
  ]);
}

function decodePng(filePath) {
  const buf = fs.readFileSync(filePath);
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

  const decompressed = zlib.inflateSync(Buffer.concat(idatChunks));
  const bytesPerPixel = 4;
  const stride = width * bytesPerPixel;
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
      if (filterType === 1) val = (rawByte + left) & 0xff;
      else if (filterType === 2) val = (rawByte + above) & 0xff;
      else if (filterType === 3) val = (rawByte + Math.floor((left + above) / 2)) & 0xff;
      else if (filterType === 4) val = (rawByte + paethPredictor(left, above, aboveLeft)) & 0xff;
      rawData[destOffset + x] = val;
    }
    destOffset += stride;
  }

  return { width, height, rawData };
}

const { width, height, rawData } = decodePng(path.join(__dirname, 'components', 'osiffa-official-logo.png'));

// Crop bounds with padding:
// Bounds: minX: 120, maxX: 505, minY: 110, maxY: 419, emblemMaxY: 261, textMinY: 282
const pad = 12;
const cropX = Math.max(0, 120 - pad);
const cropY = Math.max(0, 110 - pad);
const cropW = Math.min(width, 505 + pad) - cropX;
const cropH = Math.min(height, 419 + pad) - cropY;

console.log('Cropped dimensions:', { cropX, cropY, cropW, cropH });

function processCropped(theme) {
  // theme: 'dark' (for dark background: white strokes, bright magenta)
  // theme: 'light' (for light background: dark strokes, magenta)
  const out = Buffer.alloc(cropW * cropH * 4);

  for (let cy = 0; cy < cropH; cy++) {
    const srcY = cropY + cy;
    for (let cx = 0; cx < cropW; cx++) {
      const srcX = cropX + cx;
      const srcIdx = (srcY * width + srcX) * 4;
      const outIdx = (cy * cropW + cx) * 4;

      const r = rawData[srcIdx];
      const g = rawData[srcIdx + 1];
      const b = rawData[srcIdx + 2];

      // Check distance from white background (253, 253, 253)
      const diffFromWhite = (255 - r) + (255 - g) + (255 - b);

      if (diffFromWhite < 15) {
        // Transparent background
        out[outIdx + 3] = 0;
        continue;
      }

      // Check if it is the magenta/purple element (OSIFFA text or center bar)
      // Magenta has r and b much higher than g
      const isMagenta = (r > 90 && b > 80 && g < (r + b) * 0.45);

      if (isMagenta) {
        // Estimate alpha of magenta against white
        // In white (255,255,255), full magenta is ~(190, 35, 210)
        // Green channel drops from 255 to ~35
        const magAlpha = Math.min(255, Math.max(0, Math.round(((255 - g) / (255 - 35)) * 255)));
        
        if (theme === 'dark') {
          // Vibrant glowing fuchsia / magenta: #d946ef
          out[outIdx] = 217;     // R
          out[outIdx + 1] = 70;  // G
          out[outIdx + 2] = 239; // B
        } else {
          // Deep royal magenta: #b526d1
          out[outIdx] = 181;
          out[outIdx + 1] = 38;
          out[outIdx + 2] = 209;
        }
        out[outIdx + 3] = magAlpha;
      } else {
        // Dark stroke / text ("Telecoms" or emblem loops)
        // Estimate alpha of black/dark against white
        // Luminance
        const lum = 0.299 * r + 0.587 * g + 0.114 * b;
        const darkAlpha = Math.min(255, Math.max(0, Math.round(((254 - lum) / 235) * 255)));

        if (theme === 'dark') {
          // Pure crisp white for dark backgrounds
          out[outIdx] = 255;
          out[outIdx + 1] = 255;
          out[outIdx + 2] = 255;
        } else {
          // Deep graphite black for light backgrounds: #18181b
          out[outIdx] = 24;
          out[outIdx + 1] = 24;
          out[outIdx + 2] = 27;
        }
        out[outIdx + 3] = darkAlpha;
      }
    }
  }

  return out;
}

// Generate vertical stacked logos (standard)
const darkRgba = processCropped('dark');
const darkPng = encodePng(cropW, cropH, darkRgba);
fs.writeFileSync(path.join(__dirname, 'components', 'osiffa-logo-dark.png'), darkPng);
console.log('Saved components/osiffa-logo-dark.png (' + darkPng.length + ' bytes)');

const lightRgba = processCropped('light');
const lightPng = encodePng(cropW, cropH, lightRgba);
fs.writeFileSync(path.join(__dirname, 'components', 'osiffa-logo (1).png'), lightPng);
fs.writeFileSync(path.join(__dirname, 'components', 'osiffa-logo-light.png'), lightPng);
console.log('Saved components/osiffa-logo-light.png (' + lightPng.length + ' bytes)');

// Also generate horizontal lockup: [Emblem] on left, [Text] on right!
// Emblem Y: 110 to 261 (relative to cropY=98: 12 to 163, height 151)
// Text Y: 282 to 419 (relative to cropY=98: 184 to 321, height 137)
// Emblem X in original: ~215 to 410 (width ~195)
// Text X in original: 120 to 505 (width 385)
// Let's create a horizontal canvas:
const emblemW = 200;
const emblemH = 158;
const emblemSrcX = 214;
const emblemSrcY = 106;

const textW = 390;
const textH = 142;
const textSrcX = 118;
const textSrcY = 280;

const horizGap = 20;
const horizW = emblemW + horizGap + textW;
const horizH = Math.max(emblemH, textH);

function generateHorizontal(theme) {
  const out = Buffer.alloc(horizW * horizH * 4);

  // Helper to copy and process a patch
  function copyPatch(srcX, srcY, w, h, destX, destY) {
    for (let py = 0; py < h; py++) {
      for (let px = 0; px < w; px++) {
        const sx = srcX + px;
        const sy = srcY + py;
        if (sx >= width || sy >= height) continue;

        const sIdx = (sy * width + sx) * 4;
        const dx = destX + px;
        const dy = destY + py;
        const dIdx = (dy * horizW + dx) * 4;

        const r = rawData[sIdx];
        const g = rawData[sIdx + 1];
        const b = rawData[sIdx + 2];

        const diffFromWhite = (255 - r) + (255 - g) + (255 - b);
        if (diffFromWhite < 15) continue;

        const isMagenta = (r > 90 && b > 80 && g < (r + b) * 0.45);
        if (isMagenta) {
          const magAlpha = Math.min(255, Math.max(0, Math.round(((255 - g) / (255 - 35)) * 255)));
          if (theme === 'dark') {
            out[dIdx] = 217;
            out[dIdx + 1] = 70;
            out[dIdx + 2] = 239;
          } else {
            out[dIdx] = 181;
            out[dIdx + 1] = 38;
            out[dIdx + 2] = 209;
          }
          out[dIdx + 3] = magAlpha;
        } else {
          const lum = 0.299 * r + 0.587 * g + 0.114 * b;
          const darkAlpha = Math.min(255, Math.max(0, Math.round(((254 - lum) / 235) * 255)));
          if (theme === 'dark') {
            out[dIdx] = 255;
            out[dIdx + 1] = 255;
            out[dIdx + 2] = 255;
          } else {
            out[dIdx] = 24;
            out[dIdx + 1] = 24;
            out[dIdx + 2] = 27;
          }
          out[dIdx + 3] = darkAlpha;
        }
      }
    }
  }

  // Copy emblem to left
  copyPatch(emblemSrcX, emblemSrcY, emblemW, emblemH, 0, Math.round((horizH - emblemH) / 2));
  // Copy text to right
  copyPatch(textSrcX, textSrcY, textW, textH, emblemW + horizGap, Math.round((horizH - textH) / 2));

  return out;
}

const horizDarkRgba = generateHorizontal('dark');
const horizDarkPng = encodePng(horizW, horizH, horizDarkRgba);
fs.writeFileSync(path.join(__dirname, 'components', 'osiffa-logo-horizontal-dark.png'), horizDarkPng);
console.log('Saved components/osiffa-logo-horizontal-dark.png (' + horizDarkPng.length + ' bytes)');

const horizLightRgba = generateHorizontal('light');
const horizLightPng = encodePng(horizW, horizH, horizLightRgba);
fs.writeFileSync(path.join(__dirname, 'components', 'osiffa-logo-horizontal-light.png'), horizLightPng);
console.log('Saved components/osiffa-logo-horizontal-light.png (' + horizLightPng.length + ' bytes)');

// Also copy to public folder if it exists or create it
const publicDir = path.join(__dirname, 'public');
if (!fs.existsSync(publicDir)) fs.mkdirSync(publicDir, { recursive: true });
fs.copyFileSync(path.join(__dirname, 'components', 'osiffa-logo-dark.png'), path.join(publicDir, 'osiffa-logo-dark.png'));
fs.copyFileSync(path.join(__dirname, 'components', 'osiffa-logo-light.png'), path.join(publicDir, 'osiffa-logo-light.png'));
fs.copyFileSync(path.join(__dirname, 'components', 'osiffa-logo-horizontal-dark.png'), path.join(publicDir, 'osiffa-logo-horizontal-dark.png'));
fs.copyFileSync(path.join(__dirname, 'components', 'osiffa-logo-horizontal-light.png'), path.join(publicDir, 'osiffa-logo-horizontal-light.png'));
console.log('Copied all logos to public/');
