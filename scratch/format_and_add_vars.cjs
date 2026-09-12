const fs = require('fs');
const { execSync } = require('child_process');

let css = fs.readFileSync('src/index.css', 'utf8');

// 1. Prepare Root Variables block
const rootVars = `:root {
  /* ========================================================
     STRATWINGS (SW) COLOR PALETTE - CHANGE COLORS HERE!
     ======================================================== */
  --sw-color-yellow: #ffd905;         /* Primary brand yellow */
  --sw-color-yellow-hover: #f4c300;   /* Yellow button hover */
  --sw-color-pink: #ff64d5;           /* Hot pink accent for titles & active tabs */
  --sw-color-pink-soft: #ffbbec;      /* Soft pink for badges & secondary buttons */
  --sw-color-pink-hover: #d338a8;     /* Pink button hover */
  --sw-color-black: #000000;          /* Text, borders, outlines */
  --sw-color-white: #ffffff;          /* White text & backgrounds */
}

`;

// Replace primary color hex values with CSS variables (with fallback)
// Yellows:
css = css.replace(/#ffd905\b/gi, 'var(--sw-color-yellow, #ffd905)');
css = css.replace(/#fed806\b/gi, 'var(--sw-color-yellow, #ffd905)');
css = css.replace(/#f4c300\b/gi, 'var(--sw-color-yellow-hover, #f4c300)');

// Pinks:
css = css.replace(/#ff64d5\b/gi, 'var(--sw-color-pink, #ff64d5)');
css = css.replace(/#ffbbec\b/gi, 'var(--sw-color-pink-soft, #ffbbec)');
css = css.replace(/#d338a8\b/gi, 'var(--sw-color-pink-hover, #d338a8)');

// Prepend rootVars to index.css
css = rootVars + css;

fs.writeFileSync('src/index.css', css);
console.log('Added CSS variables to src/index.css');

// Also update PopupModal.jsx to use CSS variables
let modal = fs.readFileSync('src/components/PopupModal.jsx', 'utf8');
modal = modal.replace(/background:\s*'#ffd905'/g, "background: 'var(--sw-color-yellow, #ffd905)'");
modal = modal.replace(/color:\s*'#ff64d5'/g, "color: 'var(--sw-color-pink, #ff64d5)'");
fs.writeFileSync('src/components/PopupModal.jsx', modal);
console.log('Updated PopupModal.jsx with CSS variables');

// Run Prettier to format index.css into readable lines
console.log('Formatting src/index.css with Prettier...');
execSync('npx --yes prettier --write src/index.css', { stdio: 'inherit' });
console.log('Formatting complete!');
