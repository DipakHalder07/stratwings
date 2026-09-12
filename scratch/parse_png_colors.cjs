const fs = require('fs');
const zlib = require('zlib');

const buf = fs.readFileSync('src/assets/lottie/logo/stratwings final logo.png');
const width = buf.readUInt32BE(16);
const height = buf.readUInt32BE(20);

// Find IDAT chunks
let idatChunks = [];
let offset = 8;
while (offset < buf.length) {
  const length = buf.readUInt32BE(offset);
  const type = buf.toString('ascii', offset + 4, offset + 8);
  if (type === 'IDAT') {
    idatChunks.push(buf.subarray(offset + 8, offset + 8 + length));
  }
  offset += 12 + length;
}

const idat = Buffer.concat(idatChunks);
const decompressed = zlib.inflateSync(idat);

// Color type 6 (RGBA)
const stride = 1 + width * 4;
const counts = {};

for (let y = 0; y < height; y++) {
  const rowStart = y * stride + 1;
  for (let x = 0; x < width; x++) {
    const idx = rowStart + x * 4;
    const r = decompressed[idx];
    const g = decompressed[idx + 1];
    const b = decompressed[idx + 2];
    const a = decompressed[idx + 3];
    if (a > 200) {
      const hex = '#' + [r, g, b].map(v => v.toString(16).padStart(2, '0')).join('');
      counts[hex] = (counts[hex] || 0) + 1;
    }
  }
}

const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]);
console.log('Top exact colors in logo:');
console.table(sorted.slice(0, 15));
