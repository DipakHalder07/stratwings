
const js = require('fs').readFileSync('scratch/original_live.js', 'utf8');

// Find the code from before boldLinesOne up to lineOne
const start = js.indexOf('const v$3="5.12.1"');
const end = js.indexOf('lineOne={v,fr,ip,op,w,h,nm,ddd,assets,layers,markers,props};');
console.log('Range:', start, end);

const code = js.substring(start, end + 'lineOne={v,fr,ip,op,w,h,nm,ddd,assets,layers,markers,props};'.length);

const sandbox = {};
const fn = new Function('sandbox', code + '\n' + 'sandbox.lineOne = lineOne; sandbox.lineTwo = lineTwo; sandbox.lineThree = lineThree; sandbox.boldLinesOne = boldLinesOne;');
fn(sandbox);

console.log('boldLinesOne:', sandbox.boldLinesOne ? sandbox.boldLinesOne.nm : null);
console.log('lineTwo:', sandbox.lineTwo ? sandbox.lineTwo.nm : null);
console.log('lineThree:', sandbox.lineThree ? sandbox.lineThree.nm : null);
console.log('lineOne:', sandbox.lineOne ? sandbox.lineOne.nm : null);

require('fs').mkdirSync('src/assets/lottie', { recursive: true });
require('fs').writeFileSync('src/assets/lottie/animations.js', 
  'export const lineOne = ' + JSON.stringify(sandbox.lineOne, null, 2) + ';\n\n' +
  'export const lineTwo = ' + JSON.stringify(sandbox.lineTwo, null, 2) + ';\n\n' +
  'export const lineThree = ' + JSON.stringify(sandbox.lineThree, null, 2) + ';\n\n' +
  'export const boldLinesOne = ' + JSON.stringify(sandbox.boldLinesOne, null, 2) + ';\n'
);
console.log('Exported src/assets/lottie/animations.js successfully.');
