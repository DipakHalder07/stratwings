const fs = require('fs');
const path = require('path');

const jsxFiles = fs.readdirSync('src/components')
  .map(f => path.join('src/components', f))
  .concat(['src/App.jsx'])
  .filter(f => f.endsWith('.jsx'));

const jsxClassTokens = new Set();
const querySelectors = new Set();

jsxFiles.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  
  // 1. Match className strings
  const classMatches = content.matchAll(/className=(?:["']([^"']+)["']|{`([^`]+)`})/g);
  for (const m of classMatches) {
    const raw = m[1] || m[2];
    const cleaned = raw.replace(/\${[^}]+}/g, ' ');
    cleaned.split(/\s+/).forEach(c => {
      c = c.trim();
      if (c && /^[a-zA-Z_-][a-zA-Z0-9_-]*$/.test(c)) {
        jsxClassTokens.add(c);
      }
    });
  }

  // 2. Match dynamic ternaries in className
  // e.g. ${isMenuOpen ? 'close' : ''}, ${activeTab === group.name ? 'active' : ''}, etc.
  const ternaryMatches = content.matchAll(/\?\s*['"]([a-zA-Z_-][a-zA-Z0-9_-]*)['"]\s*:\s*['"]([a-zA-Z_-][a-zA-Z0-9_-]*)?['"]/g);
  for (const m of ternaryMatches) {
    if (m[1]) jsxClassTokens.add(m[1]);
    if (m[2]) jsxClassTokens.add(m[2]);
  }

  // 3. Match lottieClass properties
  const lottieClassMatches = content.matchAll(/lottieClass:\s*['"]([a-zA-Z_-][a-zA-Z0-9_-]*)['"]/g);
  for (const m of lottieClassMatches) {
    jsxClassTokens.add(m[1]);
  }

  // 4. Match size props in Folders
  const sizeMatches = content.matchAll(/size=(?:['"]([a-zA-Z_-][a-zA-Z0-9_-]*)['"])/g);
  for (const m of sizeMatches) {
    jsxClassTokens.add(m[1]);
  }

  // 5. QuerySelectors & classList
  const qsMatches = content.matchAll(/querySelector(?:All)?\(['"]\.([a-zA-Z_-][a-zA-Z0-9_-]*)['"]\)/g);
  for (const m of qsMatches) {
    querySelectors.add(m[1]);
  }
  const clMatches = content.matchAll(/classList\.add\(['"]([a-zA-Z_-][a-zA-Z0-9_-]*)['"]\)/g);
  for (const m of clMatches) {
    querySelectors.add(m[1]);
  }
});

// Also read all class names from src/index.css
const css = fs.readFileSync('src/index.css', 'utf8');
const cssClassRegex = /(?<=[^0-9a-zA-Z_.-]|^|[a-zA-Z_])\.([a-zA-Z_][a-zA-Z0-9_-]*)/g;
const cssClasses = new Set();
let match;
while ((match = cssClassRegex.exec(css)) !== null) {
  cssClasses.add(match[1]);
}

// Ignore file extensions or vendor classes
const excluded = new Set([
  'woff', 'woff2', 'png', 'jpg', 'jpeg', 'svg', 'webp', 'mp4', 'webm', 'ttf', 'otf',
  'item-' // template literal prefix
]);

const vendorPrefixes = ['swiper', 'lenis'];

const allCandidateClasses = new Set([...jsxClassTokens, ...cssClasses, ...querySelectors]);

const customClasses = new Set();
allCandidateClasses.forEach(c => {
  if (excluded.has(c)) return;
  if (vendorPrefixes.some(p => c.startsWith(p))) return;
  customClasses.add(c);
});

// Explicitly add item-0, item-1, item-2, item-3 if not already in
['item-0', 'item-1', 'item-2', 'item-3'].forEach(c => customClasses.add(c));
// Explicitly add big and small
['big', 'small'].forEach(c => customClasses.add(c));

console.log(`Total custom classes to prefix: ${customClasses.size}`);

// Generate mapping sorted by length descending so longer compound names are processed before shorter substrings
const sortedClasses = [...customClasses].sort((a, b) => b.length - a.length);

const mapping = {};
sortedClasses.forEach(c => {
  mapping[c] = c.startsWith('sw-') ? c : `sw-${c}`;
});

fs.writeFileSync('scratch/sw_mapping.json', JSON.stringify(mapping, null, 2));
console.log('Saved scratch/sw_mapping.json successfully');
