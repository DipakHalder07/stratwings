const fs = require('fs');
const path = require('path');

// 1. Rename public/image/footer/marina-mobile.png -> brand-mobile.png
if (fs.existsSync('public/image/footer/marina-mobile.png')) {
  fs.copyFileSync('public/image/footer/marina-mobile.png', 'public/image/footer/brand-mobile.png');
  fs.unlinkSync('public/image/footer/marina-mobile.png');
  console.log('Renamed marina-mobile.png -> brand-mobile.png');
}

// 2. Update Footer.jsx
let footer = fs.readFileSync('src/components/Footer.jsx', 'utf8');
footer = footer.replace(/marina-mobile\.png/g, 'brand-mobile.png');
footer = footer.replace(/footer-images-marina-mobile/g, 'footer-images-brand-mobile');
footer = footer.replace(/footer-images-marina/g, 'footer-images-brand');
fs.writeFileSync('src/components/Footer.jsx', footer);
console.log('Updated Footer.jsx');

// 3. Update src/index.css
let css = fs.readFileSync('src/index.css', 'utf8');
css = css.replace(/footer-images-marina-mobile/g, 'footer-images-brand-mobile');
css = css.replace(/footer-images-marina/g, 'footer-images-brand');
fs.writeFileSync('src/index.css', css);
console.log('Updated src/index.css');

// 4. Delete index.singlefile.html.bak
if (fs.existsSync('index.singlefile.html.bak')) {
  fs.unlinkSync('index.singlefile.html.bak');
  console.log('Removed index.singlefile.html.bak');
}

// 5. Clean notes.md if it exists
if (fs.existsSync('notes.md')) {
  let notes = fs.readFileSync('notes.md', 'utf8');
  notes = notes.replace(/https:\/\/marina-zakharova\.netlify\.app\/?/g, 'the reference site');
  notes = notes.replace(/marina-zakharova/gi, 'stratwings');
  notes = notes.replace(/Marina Zakharova/gi, 'StratWings');
  fs.writeFileSync('notes.md', notes);
  console.log('Sanitized notes.md');
}
