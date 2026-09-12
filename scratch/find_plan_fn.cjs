const fs = require('fs');
const js = fs.readFileSync('C:/Users/Ayushman/.gemini/antigravity-ide/brain/c061b101-cd26-41ba-903d-6d77fe2ef994/.system_generated/steps/75/content.md', 'utf8');

const pIdx = js.indexOf('function Plan(){');
console.log('function Plan(){ found at:', pIdx);
if (pIdx !== -1) {
  console.log(js.substring(pIdx, pIdx + 3000));
}
