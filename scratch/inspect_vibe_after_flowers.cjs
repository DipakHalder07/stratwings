const fs = require('fs');
const files = fs.readdirSync('.');
const bak = files.find(f => f.includes('singlefile'));
const html = fs.readFileSync(bak, 'utf8');

const startIdx = html.indexOf('<div class=vibe-wrapper>');
const flowersEnd = html.indexOf('>', html.indexOf('class=vibe-flowers', startIdx));

console.log('After flowers:');
console.log(html.substring(flowersEnd + 1, flowersEnd + 2500));
