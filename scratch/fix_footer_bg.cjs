const fs = require('fs');
let css = fs.readFileSync('src/index.css', 'utf8');
const fix = `
.footer-nav-link-bg,
.footer-nav-link-bg-hover {
  position: absolute !important;
  top: 0 !important;
  left: 0 !important;
  width: 100% !important;
  height: 100% !important;
  object-fit: fill !important;
  pointer-events: none !important;
  transform: none !important;
}
`;
css += '\n' + fix;
fs.writeFileSync('src/index.css', css, 'utf8');
console.log('Fixed footer-nav-link-bg transform successfully.');
