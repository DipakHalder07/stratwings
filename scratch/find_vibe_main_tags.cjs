const fs = require('fs');
const files = fs.readdirSync('.');
const bak = files.find(f => f.includes('singlefile'));
const html = fs.readFileSync(bak, 'utf8');

const regex = /<img[^>]*class="?[^">]*vibe-item-main[^">]*"?[^>]*>/gi;
let m;
let count = 0;
while ((m = regex.exec(html)) !== null) {
  count++;
  console.log(`item-main ${count}:`, m[0].substring(0, 150));
  if (count >= 12) break;
}
