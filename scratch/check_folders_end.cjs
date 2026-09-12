const fs = require('fs');
const files = fs.readdirSync('.');
const bak = files.find(f => f.includes('singlefile'));
const html = fs.readFileSync(bak, 'utf8');

const foldersIdx = html.indexOf('class=folders');
const endFolders = html.indexOf('</section>', foldersIdx);
console.log('Folders ends at:', endFolders);
console.log('After folders ends:');
console.log(html.substring(endFolders, endFolders + 200));
