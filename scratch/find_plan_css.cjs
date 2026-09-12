const fs = require('fs');
const css = fs.readFileSync('C:/Users/Ayushman/.gemini/antigravity-ide/brain/c061b101-cd26-41ba-903d-6d77fe2ef994/.system_generated/steps/73/content.md', 'utf8');

const regex = /\.(plan|running-line)[^{]*\{[^}]*\}/gi;
let m;
while ((m = regex.exec(css)) !== null) {
  console.log(m[0]);
}
