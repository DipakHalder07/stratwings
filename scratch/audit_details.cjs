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

const jsxOnly = [...jsxClassTokens].filter(c => !cssClasses.has(c));
console.log('JSX classes not found in CSS classes:', jsxOnly);

const cssOnly = [...cssClasses].filter(c => !jsxClassTokens.has(c));
console.log('CSS classes not found in JSX classes:', cssOnly);
