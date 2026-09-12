const fs = require('fs');
const js = fs.readFileSync('C:/Users/Ayushman/.gemini/antigravity-ide/brain/c061b101-cd26-41ba-903d-6d77fe2ef994/.system_generated/steps/75/content.md', 'utf8');

const pIdx = js.lastIndexOf('function Plan()');
const fbIdx = js.indexOf('function Feedback()', pIdx);
console.log(js.substring(pIdx, fbIdx));
