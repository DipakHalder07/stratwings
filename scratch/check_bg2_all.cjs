const fs = require('fs');
const files = fs.readdirSync('.');
const bak = files.find(f => f.includes('singlefile'));
const html = fs.readFileSync(bak, 'utf8');

const regex = /\.bg-second[^{]*\{[^}]*\}/gi;
let m;
while ((m = regex.exec(html)) !== null) {
  console.log(m[0]);
}
