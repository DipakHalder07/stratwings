const fs = require('fs');
const path = require('path');

// 1. Read all JSX files
const jsxFiles = fs.readdirSync('src/components')
  .map(f => path.join('src/components', f))
  .concat(['src/App.jsx'])
  .filter(f => f.endsWith('.jsx'));

// Gather all classes used in JSX
const jsxClassTokens = new Set();
const querySelectors = new Set();

jsxFiles.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');

  // Match className strings
  const classMatches = content.matchAll(/className=(?:["']([^"']+)["']|{`([^`]+)`})/g);
  for (const m of classMatches) {
    const raw = m[1] || m[2];
    // Strip ${...}
    const cleaned = raw.replace(/\${[^}]+}/g, ' ');
    cleaned.split(/\s+/).forEach(c => {
      c = c.trim();
      if (c && /^[a-zA-Z_-][a-zA-Z0-9_-]*$/.test(c)) {
        jsxClassTokens.add(c);
      }
    });
  }

  // Match querySelector / querySelectorAll
  const qsMatches = content.matchAll(/querySelector(?:All)?\(['"]\.([a-zA-Z_-][a-zA-Z0-9_-]*)['"]\)/g);
  for (const m of qsMatches) {
    querySelectors.add(m[1]);
  }
});

console.log('JSX Classes:', [...jsxClassTokens].sort());
console.log('QuerySelector Classes:', [...querySelectors].sort());

// Also read all class names from src/index.css
const css = fs.readFileSync('src/index.css', 'utf8');
// Valid CSS class selector regex (must not be preceded by digit or dot, must start with letter or underscore or hyphen)
// In CSS minified: .foo.bar, div.foo, etc.
const cssClassRegex = /(?:^|[^\w\d.-])\.([a-zA-Z_-][a-zA-Z0-9_-]*)/g;
const cssClasses = new Set();
let match;
while ((match = cssClassRegex.exec(css)) !== null) {
  cssClasses.add(match[1]);
}

console.log('Total valid CSS classes in index.css:', cssClasses.size);

// Vendor classes that MUST NOT be prefixed
const vendorClasses = new Set([
  'swiper',
  'swiper-slide',
  'swiper-wrapper',
  'swiper-preloader-spin',
  'lenis',
  'lenis-smooth',
  'lenis-scrolling',
  'lenis-stopped',
  'lenis-locked'
]);

// Determine all custom classes to prefix
const customClasses = new Set();
cssClasses.forEach(c => {
  if (!vendorClasses.has(c)) {
    customClasses.add(c);
  }
});
jsxClassTokens.forEach(c => {
  if (!vendorClasses.has(c)) {
    customClasses.add(c);
  }
});
querySelectors.forEach(c => {
  if (!vendorClasses.has(c)) {
    customClasses.add(c);
  }
});

// Create mapping from oldName -> sw-oldName (or sw-name if already starts with sw)
const mapping = {};
[...customClasses].sort((a, b) => b.length - a.length).forEach(c => {
  mapping[c] = c.startsWith('sw-') ? c : `sw-${c}`;
});

console.log(`Generated ${Object.keys(mapping).length} class mappings.`);
fs.writeFileSync('scratch/class_mapping.json', JSON.stringify(mapping, null, 2));
