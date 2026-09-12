const fs = require('fs');
const files = fs.readdirSync('.');
const bak = files.find(f => f.includes('singlefile'));
const html = fs.readFileSync(bak, 'utf8');

const bg2Idx = html.indexOf('bg-second');
console.log('bg-second at:', bg2Idx);
console.log(html.substring(bg2Idx - 100, bg2Idx + 500));
