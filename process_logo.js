const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

// Read osiffa-logo (1).png
const filePath = path.join(__dirname, 'components', 'osiffa-logo (1).png');
const buf = fs.readFileSync(filePath);

console.log('PNG size:', buf.length);

let pos = 8;
let width, height, bitDepth, colorType;
const idatChunks = [];
const otherChunks = [];

while (pos < buf.length) {
  const len = buf.readUInt32BE(pos);
  const type = buf.toString('ascii', pos + 4, pos + 8);
  const data = buf.slice(pos + 8, pos + 8 + len);
  const crc = buf.readUInt32BE(pos + 8 + len);
  
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

console.log('PNG dimensions:', { width, height, bitDepth, colorType });
const decompressed = zlib.inflateSync(Buffer.concat(idatChunks));
console.log('Decompressed size:', decompressed.length);
