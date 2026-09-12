const fs = require('fs');
const zlib = require('zlib');

function decodePNG(filePath) {
  const data = fs.readFileSync(filePath);
  let pos = 8;
  let width, height, bitDepth, colorType;
  const idatChunks = [];

  while (pos < data.length) {
    const len = data.readUInt32BE(pos);
    const type = data.toString('ascii', pos + 4, pos + 8);
    if (type === 'IHDR') {
      width = data.readUInt32BE(pos + 8);
      height = data.readUInt32BE(pos + 12);
      bitDepth = data[pos + 16];
      colorType = data[pos + 17];
      console.log({ width, height, bitDepth, colorType });
    } else if (type === 'IDAT') {
      idatChunks.push(data.slice(pos + 8, pos + 8 + len));
    }
    pos += 12 + len;
  }

  const compressed = Buffer.concat(idatChunks);
  const decompressed = zlib.inflateSync(compressed);
  console.log('Decompressed size:', decompressed.length);
  
  // Sample colors across the height (every 10%)
  const bytesPerPixel = colorType === 6 ? 4 : 3;
  const rowStride = 1 + width * bytesPerPixel;
  
  for (let pct = 0; pct <= 100; pct += 10) {
    const y = Math.min(height - 1, Math.floor((pct / 100) * height));
    const rowStart = y * rowStride + 1;
    // sample middle X
    const midX = Math.floor(width / 2);
    const px = rowStart + midX * bytesPerPixel;
    const r = decompressed[px];
    const g = decompressed[px + 1];
    const b = decompressed[px + 2];
    console.log(`Y: ${pct}% (px ${y}): rgb(${r}, ${g}, ${b}) hex: #${r.toString(16).padStart(2,'0')}${g.toString(16).padStart(2,'0')}${b.toString(16).padStart(2,'0')}`);
  }
}

console.log('--- bg-second-DOYhwnKY.png ---');
decodePNG('public/assets/bg-second-DOYhwnKY.png');
