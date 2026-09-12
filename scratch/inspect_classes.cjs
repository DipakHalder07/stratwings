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
  const qsMatches = content.matchAll(/querySelector(?:All)?\(['"]\.([a-zA-Z_-][a-zA-Z0-9_-]*)['"]\)/g);
  for (const m of qsMatches) {
    querySelectors.add(m[1]);
  }
});

const css = fs.readFileSync('src/index.css', 'utf8');
const cssClassRegex = /(?:^|[^\w\d.-])\.([a-zA-Z_-][a-zA-Z0-9_-]*)/g;
const cssClasses = new Set();
let match;
while ((match = cssClassRegex.exec(css)) !== null) {
  cssClasses.add(match[1]);
}

console.log('Unique JSX classes:', jsxClassTokens.size);
console.log('Unique CSS classes:', cssClasses.size);

const all = new Set([...jsxClassTokens, ...cssClasses, ...querySelectors]);
console.log('Total unique classes:', all.size);
const swiperClasses = [...all].filter(c => c.startsWith('swiper'));
console.log('Swiper classes:', swiperClasses);
const lenisClasses = [...all].filter(c => c.startsWith('lenis'));
console.log('Lenis classes:', lenisClasses);

// Non-vendor classes
const custom = [...all].filter(c => !c.startsWith('swiper') && !c.startsWith('lenis'));
console.log('Total custom classes to prefix:', custom.length);

// Check if any marina or zakharova classes exist
const brand = [...all].filter(c => /marina|zakharova/i.test(c));
console.log('Brand classes found:', brand);
