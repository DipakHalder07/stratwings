const fs = require('fs');
const js = fs.readFileSync('scratch/original_live.js', 'utf8');

// Find main tag
const mainIdx = js.indexOf('"main"');
console.log('main index:', mainIdx);
if (mainIdx !== -1) {
  console.log('=== MAIN SURROUNDINGS ===');
  console.log(js.substring(mainIdx - 400, mainIdx + 600));
}

// Find Vibe component definition
const vibeIdx = js.indexOf('"vibe"');
console.log('vibe index:', vibeIdx);
if (vibeIdx !== -1) {
  console.log('=== VIBE SURROUNDINGS ===');
  console.log(js.substring(vibeIdx - 200, vibeIdx + 600));
}

// Find Footer component definition
const footerIdx = js.indexOf('"footer"');
console.log('footer index:', footerIdx);
if (footerIdx !== -1) {
  console.log('=== FOOTER SURROUNDINGS ===');
  console.log(js.substring(footerIdx - 200, footerIdx + 600));
}
