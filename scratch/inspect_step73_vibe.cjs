const fs = require('fs');
const css = fs.readFileSync('C:/Users/Ayushman/.gemini/antigravity-ide/brain/c061b101-cd26-41ba-903d-6d77fe2ef994/.system_generated/steps/73/content.md', 'utf8');

const idx = css.indexOf('.vibe-items{');
console.log(css.substring(idx - 50, idx + 800));
