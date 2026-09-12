const fs = require('fs');
const files = fs.readdirSync('.');
const bak = files.find(f => f.includes('singlefile'));
const html = fs.readFileSync(bak, 'utf8');

const vibeDomIdx = html.indexOf('<div class="vibe-wrapper">');
if (vibeDomIdx !== -1) {
  console.log(html.substring(vibeDomIdx - 200, vibeDomIdx + 1500));
} else {
  const vIdx = html.indexOf('vibe-wrapper');
  console.log('vibe-wrapper in DOM:');
  console.log(html.substring(vIdx - 100, vIdx + 600));
}
