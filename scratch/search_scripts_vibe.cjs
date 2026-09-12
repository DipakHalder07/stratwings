const fs = require('fs');
const files = fs.readdirSync('.');
const bak = files.find(f => f.includes('singlefile'));
const html = fs.readFileSync(bak, 'utf8');

const regex = /<script[^>]*>([\s\S]*?)<\/script>/gi;
let m;
let i = 0;
while ((m = regex.exec(html)) !== null) {
  const content = m[1];
  if (content.includes('vibe') || content.includes('bg-second') || content.includes('folders')) {
    console.log(`Script ${i} matches: length ${content.length}`);
    // find mentions
    let idx = 0;
    while ((idx = content.indexOf('vibe', idx)) !== -1) {
      console.log('Mention at', idx, ':', content.substring(Math.max(0, idx - 100), idx + 200));
      idx += 4;
      if (idx > 5000) break; // don't overwhelm
    }
  }
  i++;
}
