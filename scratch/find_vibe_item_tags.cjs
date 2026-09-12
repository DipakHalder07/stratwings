const fs = require('fs');
const files = fs.readdirSync('.');
const bak = files.find(f => f.includes('singlefile'));
const html = fs.readFileSync(bak, 'utf8');

const regex = /<span[^>]*class="?[^">]*vibe-item[^">]*"?[^>]*>/gi;
let m;
let count = 0;
while ((m = regex.exec(html)) !== null) {
  count++;
  console.log(`vibe-item ${count}:`, m[0]);
  if (count >= 12) break;
}
