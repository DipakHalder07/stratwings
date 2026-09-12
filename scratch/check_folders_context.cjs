const fs = require('fs');
const files = fs.readdirSync('.');
const bak = files.find(f => f.includes('singlefile'));
const html = fs.readFileSync(bak, 'utf8');

const foldersIdx = html.indexOf('class=folders');
console.log('folders tag index:', foldersIdx);
console.log('Context around folders:');
console.log(html.substring(foldersIdx - 300, foldersIdx + 400));
