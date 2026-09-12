const fs = require('fs');
const path = require('path');

const jsxFiles = fs.readdirSync('src/components')
  .map(f => path.join('src/components', f))
  .concat(['src/App.jsx'])
  .filter(f => f.endsWith('.jsx'));

const jsxClasses = new Set();
jsxFiles.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  // Match className="..." or className={`...`} or className='...'
  const regex = /className=(?:["']([^"']+)["']|{`([^`]+)`})/g;
  let m;
  while ((m = regex.exec(content)) !== null) {
    const raw = m[1] || m[2];
    raw.split(/\s+/).forEach(cls => {
      cls = cls.trim();
      // Remove template interpolations like ${...}
      if (cls && !cls.includes('$') && !cls.includes('{') && !cls.includes('}')) {
        jsxClasses.add(cls);
      }
    });
  }
});

// Also read all class selectors in src/index.css
const css = fs.readFileSync('src/index.css', 'utf8');
const cssClassRegex = /\.([a-zA-Z0-9_-]+)/g;
const cssClasses = new Set();
let cm;
while ((cm = cssClassRegex.exec(css)) !== null) {
  cssClasses.add(cm[1]);
}

console.log('Unique JSX classes:', jsxClasses.size);
console.log('Unique CSS classes in index.css:', cssClasses.size);

// Identify non-prefixed custom classes (excluding vendor like swiper, lenis)
const vendorPrefixes = ['swiper', 'lenis'];
const customClasses = [...cssClasses].filter(cls => {
  return !vendorPrefixes.some(v => cls.startsWith(v));
});

console.log('Total custom project classes to prefix with "sw-":', customClasses.length);
fs.writeFileSync('scratch/custom_classes.json', JSON.stringify({
  customClasses: customClasses.sort(),
  jsxClasses: [...jsxClasses].sort()
}, null, 2));

console.log('Saved scratch/custom_classes.json');
