const fs = require('fs');
const files = fs.readdirSync('.');
const bak = files.find(f => f.includes('singlefile'));
const html = fs.readFileSync(bak, 'utf8');

// Find in HTML markup, not <style>
const tagRegex = /<[^>]+class="[^"]*vibe[^"]*"[^>]*>/gi;
let m;
while ((m = tagRegex.exec(html)) !== null) {
  console.log('Match at', m.index, ':', m[0]);
  console.log('Surroundings:');
  console.log(html.substring(Math.max(0, m.index - 200), m.index + 500));
}
