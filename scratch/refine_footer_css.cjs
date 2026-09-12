const fs = require('fs');

let css = fs.readFileSync('src/index.css', 'utf8');

const refineCSS = `
/* Global Container Utility */
.container {
  max-width: 1412px;
  width: 100%;
  margin: 0 auto;
  padding-left: 32px;
  padding-right: 32px;
  box-sizing: border-box;
}

/* Refined Footer Styles */
.footer {
  background: #ffd905;
  padding: 100px 0 40px;
  width: 100%;
  position: relative;
  z-index: 4;
  overflow: hidden;
}

.footer-nav {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
  max-width: 320px;
}

.footer-nav-link {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 8px 24px;
  height: 48px;
  text-decoration: none;
  cursor: pointer;
  transition: transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.footer-nav-link:hover {
  transform: scale(1.05) rotate(-1deg);
}

.footer-nav-link span {
  color: #ff64d5;
  font-size: 22px;
  font-weight: 700;
  letter-spacing: 0.5px;
  position: relative;
  z-index: 2;
  white-space: nowrap;
}

.footer-nav-link:hover span {
  color: #ffffff;
}

.footer-nav-link-bg,
.footer-nav-link-bg-hover {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: fill;
  pointer-events: none;
}

.feedback-flowers.all,
.feedback-flowers.down {
  bottom: -2px !important;
}
`;

css += '\n' + refineCSS;
fs.writeFileSync('src/index.css', css, 'utf8');
console.log('Refined CSS successfully appended.');
