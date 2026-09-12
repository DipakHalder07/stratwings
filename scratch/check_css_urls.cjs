const fs = require('fs');
const css = fs.readFileSync('scratch/original_live.css', 'utf8');
const urls = [];
const regex = /url\(([^)]+)\)/g;
let m;
while ((m = regex.exec(css)) !== null) {
  urls.push(m[1].replace(/['"]/g, ''));
}
const uniqueUrls = Array.from(new Set(urls));
console.log('Unique URLs in original_live.css:', uniqueUrls.length);
uniqueUrls.forEach(u => {
  const localPath = 'public' + (u.startsWith('/') ? u : '/' + u);
  const exists = fs.existsSync(localPath);
  console.log(exists ? 'EXISTS:' : 'MISSING:', u, exists ? '' : '-> check ' + localPath);
});
