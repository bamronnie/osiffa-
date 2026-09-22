const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

const srcFile = path.join(__dirname, 'components', 'osiffa-official-logo.png');
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

// Find bounding boxes:
// Background color sample at (10, 10):
const bgR = rawData[0];
const bgG = rawData[1];
const bgB = rawData[2];
console.log('Background sample at 0,0:', { bgR, bgG, bgB });

// Find where the emblem ends and where OSIFFA starts
let minX = width, maxX = 0, minY = height, maxY = 0;
let emblemMaxY = 0;
let textMinY = height;

for (let y = 0; y < height; y++) {
  let hasContent = false;
  for (let x = 0; x < width; x++) {
    const idx = (y * width + x) * 4;
    const r = rawData[idx];
    const g = rawData[idx + 1];
    const b = rawData[idx + 2];
    
    // Check if not background
    const diff = Math.abs(r - bgR) + Math.abs(g - bgG) + Math.abs(b - bgB);
    if (diff > 30) {
      hasContent = true;
      if (x < minX) minX = x;
      if (x > maxX) maxX = x;
      if (y < minY) minY = y;
      if (y > maxY) maxY = y;

      if (y < 265) {
        if (y > emblemMaxY) emblemMaxY = y;
      } else {
        if (y < textMinY) textMinY = y;
      }
    }
  }
}

console.log('Content bounds:', { minX, maxX, minY, maxY, emblemMaxY, textMinY });
