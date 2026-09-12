const fs = require('fs');
const css = fs.readFileSync('C:/Users/Ayushman/.gemini/antigravity-ide/brain/c061b101-cd26-41ba-903d-6d77fe2ef994/.system_generated/steps/73/content.md', 'utf8');

let idx = 0;
while ((idx = css.indexOf('.vibe-items', idx)) !== -1) {
  let end = css.indexOf('}', idx);
  console.log('vibe-items at', idx, ':', css.substring(idx, end + 1));
  idx += 11;
}

idx = 0;
while ((idx = css.indexOf('.vibe-item{', idx)) !== -1) {
  let end = css.indexOf('}', idx);
  console.log('vibe-item at', idx, ':', css.substring(idx, end + 1));
  idx += 10;
}
