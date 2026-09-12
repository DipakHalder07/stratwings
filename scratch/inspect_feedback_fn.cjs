const fs = require('fs');
const js = fs.readFileSync('C:/Users/Ayushman/.gemini/antigravity-ide/brain/c061b101-cd26-41ba-903d-6d77fe2ef994/.system_generated/steps/75/content.md', 'utf8');

const fbIdx = js.lastIndexOf('function Feedback(){');
const nextFn = js.indexOf('function Footer(){', fbIdx);
console.log(js.substring(fbIdx, nextFn));
