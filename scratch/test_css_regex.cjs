const fs = require('fs');

const css = fs.readFileSync('src/index.css', 'utf8');

// Find all matches of `\.([a-zA-Z_][a-zA-Z0-9_-]*)`
const regex = /(?<=[^0-9a-zA-Z_.-]|^|[a-zA-Z_])\.([a-zA-Z_][a-zA-Z0-9_-]*)/g;
const classesFound = new Set();
let m;
while ((m = regex.exec(css)) !== null) {
  classesFound.add(m[1]);
}

console.log('Total classes identified:', classesFound.size);

// Check if any numbers or weird things were matched:
const weird = [...classesFound].filter(c => /^\d/.test(c) || /^(s|ms|vw|vh|px|rem|em|deg|fr)$/.test(c));
console.log('Weird matches (should be empty):', weird);
