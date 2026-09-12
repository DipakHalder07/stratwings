const fs = require('fs');
const files = fs.readdirSync('.');
const bak = files.find(f => f.includes('singlefile'));
const html = fs.readFileSync(bak, 'utf8');

const regex = /<div[^>]*class="?bg-second"?[^>]*>/gi;
let m;
while ((m = regex.exec(html)) !== null) {
  console.log('HTML tag bg-second at:', m.index);
  console.log(html.substring(m.index, m.index + 500));
}
