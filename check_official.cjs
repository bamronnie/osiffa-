const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

const srcFile = path.join(__dirname, 'components', 'osiffa-official-logo.png');
const buf = fs.readFileSync(srcFile);

let pos = 8;
let width, height, bitDepth, colorType;
while (pos < buf.length) {
  const len = buf.readUInt32BE(pos);
  const type = buf.toString('ascii', pos + 4, pos + 8);
  if (type === 'IHDR') {
    width = buf.readUInt32BE(pos + 8);
    height = buf.readUInt32BE(pos + 12);
    bitDepth = buf.readUInt8(pos + 16);
    colorType = buf.readUInt8(pos + 17);
    break;
  }
  pos += 12 + len;
}

console.log('Official logo:', { width, height, bitDepth, colorType });
