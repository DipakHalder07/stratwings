const fs = require('fs');
const js = fs.readFileSync('C:/Users/Ayushman/.gemini/antigravity-ide/brain/c061b101-cd26-41ba-903d-6d77fe2ef994/.system_generated/steps/75/content.md', 'utf8');

function getReturn(fnName) {
  const idx = js.indexOf(`function ${fnName}(`);
  const retIdx = js.indexOf('return', idx);
  // find end of function
  const nextFn = js.indexOf('function ', idx + 10);
  console.log(`=== RETURN OF ${fnName} ===`);
  console.log(js.substring(retIdx, Math.min(nextFn, retIdx + 3000)));
}

getReturn('Concepts');
getReturn('Plan');
getReturn('Feedback');
getReturn('Footer');
