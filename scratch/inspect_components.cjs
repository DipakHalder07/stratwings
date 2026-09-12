const fs = require('fs');
const js = fs.readFileSync('C:/Users/Ayushman/.gemini/antigravity-ide/brain/c061b101-cd26-41ba-903d-6d77fe2ef994/.system_generated/steps/75/content.md', 'utf8');

function inspectFn(name) {
  const idx = js.indexOf(`function ${name}(`);
  console.log(`=== ${name} ===`);
  if (idx !== -1) {
    console.log(js.substring(idx, idx + 1500));
  } else {
    console.log('Not found');
  }
}

inspectFn('Concepts');
inspectFn('Plan');
inspectFn('Feedback');
inspectFn('Footer');
