const fs = require('fs');
const path = require('path');

const mapping = JSON.parse(fs.readFileSync('scratch/sw_mapping.json', 'utf8'));

const jsxFiles = fs.readdirSync('src/components')
  .map(f => path.join('src/components', f))
  .concat(['src/App.jsx'])
  .filter(f => f.endsWith('.jsx'));

function transformJsx(content, filePath) {
  let modified = content;

  // 1. Transform className="..."
  modified = modified.replace(/className="([^"]+)"/g, (match, classStr) => {
    const tokens = classStr.split(/\s+/).map(t => {
      if (!t) return t;
      return mapping[t] || t;
    });
    return `className="${tokens.join(' ')}"`;
  });

  // 2. Transform className='...'
  modified = modified.replace(/className='([^']+)'/g, (match, classStr) => {
    const tokens = classStr.split(/\s+/).map(t => {
      if (!t) return t;
      return mapping[t] || t;
    });
    return `className='${tokens.join(' ')}'`;
  });

  // 3. Transform specific known dynamic patterns:
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
  
  // Check if any old custom class names still exist in className
  const classMatches = transformed.matchAll(/className=(?:["']([^"']+)["']|{`([^`]+)`})/g);
  const remaining = [];
  for (const m of classMatches) {
    const raw = m[1] || m[2];
    const cleaned = raw.replace(/\${[^}]+}/g, ' ');
    cleaned.split(/\s+/).forEach(c => {
      c = c.trim();
      if (c && !c.startsWith('sw-') && !c.startsWith('swiper') && !c.startsWith('lenis')) {
        remaining.push(c);
      }
    });
  }
  console.log(`${file}: ${remaining.length === 0 ? 'ALL PREF' : 'REMAINING: ' + remaining.join(', ')}`);
});
