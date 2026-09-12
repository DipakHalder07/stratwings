const fs = require('fs');

const html = fs.readFileSync('3ea7f34b-1c2d-4a23-a16f-733ae4b1aedb.html', 'utf8');
const idx = html.indexOf('vibe');
console.log('vibe index:', idx);

const regex = /<section[^>]*class="[^"]*vibe[^"]*"[^>]*>[\s\S]*?<\/section>/gi;
const match = regex.exec(html);
if (match) {
  console.log('Found section vibe:');
  console.log(match[0].substring(0, 1500));
} else {
  console.log('No section vibe found with regex, searching vibe-wrapper:');
  const wIdx = html.indexOf('vibe-wrapper');
  if (wIdx !== -1) {
    console.log(html.substring(wIdx - 200, wIdx + 800));
  }
}
