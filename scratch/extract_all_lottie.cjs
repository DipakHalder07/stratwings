const fs = require('fs');

const js = fs.readFileSync('scratch/original_live.js', 'utf8');

const start = js.indexOf('v$4="5.12.1"');
const endToken = 'lineOne={v,fr,ip,op,w,h,nm,ddd,assets,layers,markers,props};';
const end = js.indexOf(endToken) + endToken.length;

console.log('Extracting from', start, 'to', end);
const code = 'var ' + js.substring(start, end);

// Wrap in a function that returns all the objects
const evalFn = new Function(`
  ${code}
  return { arrow, boldLinesOne, lineTwo, lineThree, lineOne };
`);

const result = evalFn();

console.log('Successfully extracted animations:');
Object.keys(result).forEach(k => {
  console.log('-', k, result[k] ? `${result[k].nm} (${result[k].op} frames)` : 'null');
});

fs.mkdirSync('src/assets/lottie', { recursive: true });

fs.writeFileSync(
  'src/assets/lottie/animations.js',
  `// Extracted Lottie animation data from original live site
export const arrow = ${JSON.stringify(result.arrow)};
export const boldLinesOne = ${JSON.stringify(result.boldLinesOne)};
export const lineTwo = ${JSON.stringify(result.lineTwo)};
export const lineThree = ${JSON.stringify(result.lineThree)};
export const lineOne = ${JSON.stringify(result.lineOne)};
`
);

console.log('Saved src/assets/lottie/animations.js successfully!');
