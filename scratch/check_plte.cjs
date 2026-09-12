const fs = require('fs');

const data = fs.readFileSync('public/assets/bg-second-DOYhwnKY.png');
let pos = 8;
let plte;
while (pos < data.length) {
  const len = data.readUInt32BE(pos);
  const type = data.toString('ascii', pos + 4, pos + 8);
  if (type === 'PLTE') {
    plte = data.slice(pos + 8, pos + 8 + len);
    console.log('PLTE palette colors count:', plte.length / 3);
    for (let i = 0; i < Math.min(20, plte.length / 3); i++) {
      console.log(`Color ${i}: rgb(${plte[i*3]}, ${plte[i*3+1]}, ${plte[i*3+2]})`);
    }
  }
  pos += 12 + len;
}
