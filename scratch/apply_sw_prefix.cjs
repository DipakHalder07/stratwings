const fs = require('fs');
const path = require('path');

const mapping = JSON.parse(fs.readFileSync('scratch/sw_mapping.json', 'utf8'));

// 1. Transform src/index.css
console.log('Transforming src/index.css...');
const css = fs.readFileSync('src/index.css', 'utf8');

const newCss = css.replace(/(?<=[^0-9a-zA-Z_.-]|^|[a-zA-Z_])\.([a-zA-Z_][a-zA-Z0-9_-]*)/g, (match, cls) => {
  if (mapping[cls]) {
    return '.' + mapping[cls];
  }
  return match;
});

fs.writeFileSync('src/index.css', newCss);
console.log('Saved src/index.css');

// 2. Transform all JSX files
const jsxFiles = fs.readdirSync('src/components')
  .map(f => path.join('src/components', f))
  .concat(['src/App.jsx'])
  .filter(f => f.endsWith('.jsx'));

function transformJsx(content, filePath) {
  let modified = content;

  // Transform className="..."
  modified = modified.replace(/className="([^"]+)"/g, (match, classStr) => {
    const tokens = classStr.split(/\s+/).map(t => {
      if (!t) return t;
      return mapping[t] || t;
    });
    return `className="${tokens.join(' ')}"`;
  });

  // Transform className='...'
  modified = modified.replace(/className='([^']+)'/g, (match, classStr) => {
    const tokens = classStr.split(/\s+/).map(t => {
      if (!t) return t;
      return mapping[t] || t;
    });
    return `className='${tokens.join(' ')}'`;
  });

  // Dynamic patterns:
  // Folders.jsx
  modified = modified.replace(/size = 'big'/g, "size = 'sw-big'");
  modified = modified.replace(/size = 'small'/g, "size = 'sw-small'");
  modified = modified.replace(/size="small"/g, 'size="sw-small"');
  modified = modified.replace(/size="big"/g, 'size="sw-big"');
  modified = modified.replace(/`folders-item \${size}`/g, "`sw-folders-item ${size}`");
  modified = modified.replace(/`folders-item-context \${autoplay \? 'autoplay' : ''}`/g, "`sw-folders-item-context ${autoplay ? 'sw-autoplay' : ''}`");

  // Header.jsx
  modified = modified.replace(/`header \${isScrolled \? 'header-scrolled' : ''}`/g, "`sw-header ${isScrolled ? 'sw-header-scrolled' : ''}`");
  modified = modified.replace(/`header-button-menu \${isMenuOpen \? 'close' : ''}`/g, "`sw-header-button-menu ${isMenuOpen ? 'sw-close' : ''}`");
  modified = modified.replace(/`header-mobile-menu \${isMenuOpen \? 'open' : ''}`/g, "`sw-header-mobile-menu ${isMenuOpen ? 'sw-open' : ''}`");

  // Portfolio.jsx
  modified = modified.replace(/`portfolio-button \${activeTab === group\.name \? 'active' : ''}`/g, "`sw-portfolio-button ${activeTab === group.name ? 'sw-active' : ''}`");
  modified = modified.replace(/`portfolio-page-item item-\${idx % 4}`/g, "`sw-portfolio-page-item sw-item-${idx % 4}`");
  // Portfolio lottieClasses in ALL_ITEMS array:
  ['lottie-pet-one', 'lottie-pet-two', 'lottie-food-one', 'lottie-food-two', 'lottie-health-one', 'lottie-health-two', 'lottie-lifestyle-one', 'lottie-lifestyle-two'].forEach(c => {
    modified = modified.replace(new RegExp(`'${c}'`, 'g'), `'${mapping[c]}'`);
  });

  // Vibe.jsx
  modified = modified.replace(/`vibe-item \${activeItem === idx \? 'is-active' : ''}`/g, "`sw-vibe-item ${activeItem === idx ? 'sw-is-active' : ''}`");

  // Feedback.jsx
  modified = modified.replace(/\.feedback-letter/g, '.sw-feedback-letter');
  modified = modified.replace(/'feedback-letter-is-visible'/g, "'sw-feedback-letter-is-visible'");

  return modified;
}

jsxFiles.forEach(file => {
  const original = fs.readFileSync(file, 'utf8');
  const transformed = transformJsx(original, file);
  fs.writeFileSync(file, transformed);
  console.log(`Saved transformed ${file}`);
});

console.log('All files transformed successfully!');
