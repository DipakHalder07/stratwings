const fs = require('fs');

// Read a PNG without external dependencies to see if there is text or check chunk data
const buf = fs.readFileSync('public/assets/bg-second-DOYhwnKY.png');
console.log('PNG header:', buf.slice(0, 8));

// Let's check bg-first as well
const buf1 = fs.readFileSync('public/assets/bg-first-Cpqbn9oc.png');
console.log('bg-first size:', buf1.length);

// Let's check if there are any other background images
console.log('Looking for bg images in public:');
function walk(dir) {
  for (const f of fs.readdirSync(dir)) {
    const p = dir + '/' + f;
    if (fs.statSync(p).isDirectory()) walk(p);
    else if (f.toLowerCase().includes('bg') || f.toLowerCase().includes('background')) {
      console.log('Found:', p, fs.statSync(p).size);
    }
  }
}
walk('public');
