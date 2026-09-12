const fs = require('fs');

let css = fs.readFileSync('src/index.css', 'utf8');

// 1. Update 3D Yellow Buttons (yellow-big, yellow-small, yellow-medium)
// Replace hardcoded #ffdc14 with var(--sw-color-yellow, #cab373)
css = css.replace(/background:\s*#ffdc14;/g, 'background: var(--sw-color-yellow, #cab373);');

// Replace yellow button shadows (#c7b705 -> #9e894f, #f6f277f7 -> #e8d8aa, #f6e177f7 -> #d4c18f, #f6f27780 -> #d4c18f80)
css = css.replace(/#c7b705/g, '#9e894f');
css = css.replace(/#f6f277f7/g, '#e8d8aa');
css = css.replace(/#f6e177f7/g, '#d4c18f');
css = css.replace(/#f6f27780/g, '#d4c18f80');

// 2. Update 3D Pink/Periwinkle Buttons shadows
// Magenta shadows: #db40b1 -> #6885b5, #ffe1f7 -> #dbe5f7, #f75ccd -> #6885b5, #ffddf6 -> #dbe5f7
css = css.replace(/#db40b1/g, '#6885b5');
css = css.replace(/#ffe1f7/g, '#dbe5f7');
css = css.replace(/#f75ccd/g, '#6885b5');
css = css.replace(/#ffddf6/g, '#dbe5f7');
css = css.replace(/#9d0474/g, '#2b456e');
css = css.replace(/#d53aab/g, '#5978a8');
css = css.replace(/#76004b/g, '#2b456e');
css = css.replace(/#e146b7/g, '#5978a8');
css = css.replace(/#d035a6/g, 'var(--sw-color-pink-hover, #436399)');

// 3. Add filter to Feedback Envelope and Vibe Label if not present
if (!css.includes('.sw-feedback-envelope-main {')) {
  css += `
.sw-feedback-envelope-main,
.sw-feedback-envelope-front,
.sw-feedback-envelope-down,
.sw-feedback-envelope-had,
.sw-vibe-label-img {
  filter: var(--sw-folder-filter, none);
  transition: filter 0.3s ease;
}
`;
} else {
  // Find where feedback envelope rules are and attach filter
  css = css.replace(
    /\.sw-feedback-envelope-main\s*\{/g,
    `.sw-feedback-envelope-main,
.sw-feedback-envelope-front,
.sw-feedback-envelope-down,
.sw-feedback-envelope-had,
.sw-vibe-label-img {
  filter: var(--sw-folder-filter, none);
  transition: filter 0.3s ease;
}
.sw-feedback-envelope-main {`
  );
}

fs.writeFileSync('src/index.css', css);
console.log('Applied theme button shadows and envelope filter successfully');
