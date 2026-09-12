const fs = require('fs');
const zlib = require('zlib');

// Inspect vibe-flowers.png
const data = fs.readFileSync('public/image/vibe/vibe-flowers.png');
let pos = 8;
let width, height, bitDepth, colorType;
const chunks = [];

while (pos < data.length) {
  const len = data.readUInt32BE(pos);
  const type = data.toString('ascii', pos + 4, pos + 8);
  if (type === 'IHDR') {
    width = data.readUInt32BE(pos + 8);
    height = data.readUInt32BE(pos + 12);
    bitDepth = data[pos + 16];
    colorType = data[pos + 17];
  } else if (type === 'IDAT') {
    chunks.push(data.slice(pos + 8, pos + 8 + len));
  }
  pos += 12 + len;
}

console.log({ width, height, bitDepth, colorType });
const decompressed = zlib.inflateSync(Buffer.concat(chunks));
console.log('Decompressed len:', decompressed.length);
