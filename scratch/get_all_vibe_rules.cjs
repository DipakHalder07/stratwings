const fs = require('fs');
const css = fs.readFileSync('C:/Users/Ayushman/.gemini/antigravity-ide/brain/c061b101-cd26-41ba-903d-6d77fe2ef994/.system_generated/steps/73/content.md', 'utf8');

// Find all occurrences of 'vibe' and 'bg-second' and their full rule blocks (including media queries)
function findRulesContaining(text) {
  let idx = 0;
  while ((idx = css.indexOf(text, idx)) !== null && idx !== -1) {
    // Find start of rule or @media
    let start = css.lastIndexOf('}', idx);
    start = start === -1 ? 0 : start + 1;
    let end = css.indexOf('}', idx);
    if (end === -1) end = css.length;
    console.log('--- MATCH AT', idx, '---');
    console.log(css.substring(start, Math.min(css.length, end + 1)));
    idx += text.length;
  }
}

console.log('=== VIBE RULES ===');
findRulesContaining('vibe');
