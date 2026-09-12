const fs = require('fs');
const js = fs.readFileSync('C:/Users/Ayushman/.gemini/antigravity-ide/brain/c061b101-cd26-41ba-903d-6d77fe2ef994/.system_generated/steps/75/content.md', 'utf8');

const fbIdx = js.lastIndexOf('function Feedback(){');
const retIdx = js.indexOf('return jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment', fbIdx);
const endIdx = js.indexOf('function Button(', retIdx);
console.log(js.substring(retIdx, Math.min(js.length, retIdx + 2500)));
