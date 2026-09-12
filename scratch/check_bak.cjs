const fs = require('fs');
const files = fs.readdirSync('.');
const bak = files.find(f => f.includes('singlefile'));
console.log('Found bak file:', bak);
if (bak) {
  const html = fs.readFileSync(bak, 'utf8');
  console.log('Size:', html.length);
  const wIdx = html.indexOf('vibe');
  console.log('vibe index:', wIdx);
  if (wIdx !== -1) {
    console.log(html.substring(wIdx - 150, wIdx + 600));
  }
}
