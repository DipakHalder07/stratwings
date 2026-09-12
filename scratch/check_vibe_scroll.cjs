const fs = require('fs');
const js = fs.readFileSync('C:/Users/Ayushman/.gemini/antigravity-ide/brain/c061b101-cd26-41ba-903d-6d77fe2ef994/.system_generated/steps/75/content.md', 'utf8');

// Check any mentions of ScrollTrigger or gsap or scroll animations for vibe or folders
const regex = /(ScrollTrigger|gsap)[^;]{0,200}(vibe|folder)[^;]{0,200}/gi;
let m;
while ((m = regex.exec(js)) !== null) {
  console.log('Match:', m[0]);
}

// Also check all occurrences of 'vibe-wrapper' in JS
let idx = 0;
while ((idx = js.indexOf('vibe-wrapper', idx)) !== -1) {
  console.log('vibe-wrapper in JS:', js.substring(Math.max(0, idx - 100), idx + 200));
  idx += 12;
}
