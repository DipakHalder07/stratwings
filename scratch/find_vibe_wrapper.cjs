const fs = require('fs');
const files = fs.readdirSync('.');
const bak = files.find(f => f.includes('singlefile'));
const html = fs.readFileSync(bak, 'utf8');

const regex = /<[^>]*vibe-wrapper[^>]*>/gi;
let m = regex.exec(html);
if (m) {
  console.log('Found vibe-wrapper at', m.index);
  console.log(html.substring(m.index - 500, m.index + 2000));
} else {
  console.log('No vibe-wrapper found');
}
