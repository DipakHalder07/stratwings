const fs = require('fs');
const js = fs.readFileSync('scratch/original_live.js', 'utf8');

function findComponent(name) {
  const pattern = new RegExp(`function ${name}\\(`, 'g');
  let match = pattern.exec(js);
  if (match) {
    console.log(`=== FOUND function ${name} at index ${match.index} ===`);
    console.log(js.substring(match.index, match.index + 1200));
    return;
  }
  const arrowPattern = new RegExp(`const ${name}\\s*=\\s*\\(`, 'g');
  match = arrowPattern.exec(js);
  if (match) {
    console.log(`=== FOUND const ${name} at index ${match.index} ===`);
    console.log(js.substring(match.index, match.index + 1200));
    return;
  }
  console.log(`Component ${name} NOT found directly`);
}

const comps = [
  'Banner', 'About', 'Portfolio', 'Vibe', 'Folders',
  'Concepts', 'Plan', 'Feedback', 'Footer', 'Header',
  'SmoothScroll', 'Loader', 'MessagePopup'
];

comps.forEach(findComponent);
