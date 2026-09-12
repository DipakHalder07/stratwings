const fs = require('fs');

const css = fs.readFileSync('src/index.css', 'utf8');
const mapping = JSON.parse(fs.readFileSync('scratch/sw_mapping.json', 'utf8'));

let replacedCount = 0;
const replacedClasses = new Set();

const newCss = css.replace(/(?<=[^0-9a-zA-Z_.-]|^|[a-zA-Z_])\.([a-zA-Z_][a-zA-Z0-9_-]*)/g, (match, cls) => {
  if (mapping[cls]) {
    replacedCount++;
    replacedClasses.add(cls);
    return '.' + mapping[cls];
  }
  return match;
});

console.log(`Replaced ${replacedCount} selector occurrences across ${replacedClasses.size} unique classes.`);

// Check for any accidental corruptions
console.log('Includes .sw-png:', newCss.includes('.sw-png'));
console.log('Includes .sw-woff:', newCss.includes('.sw-woff'));
console.log('Includes .sw-swiper:', newCss.includes('.sw-swiper'));
console.log('Includes .sw-lenis:', newCss.includes('.sw-lenis'));
console.log('Includes .25s:', newCss.includes('.25s'));
console.log('Includes .99vw:', newCss.includes('.99vw'));
console.log('Includes .sw-25s:', newCss.includes('.sw-25s'));
console.log('Includes .sw-container:', newCss.includes('.sw-container'));
console.log('Includes .sw-banner:', newCss.includes('.sw-banner'));
console.log('Includes .sw-button:', newCss.includes('.sw-button'));
console.log('Includes .sw-footer:', newCss.includes('.sw-footer'));
