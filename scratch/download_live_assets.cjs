const fs = require('fs');
const path = require('path');

async function downloadAsset(urlPath) {
  const cleanPath = urlPath.replace(/['"]/g, '').split('#')[0].split('?')[0];
  if (!cleanPath.startsWith('/') || cleanPath.startsWith('//') || cleanPath.startsWith('http') || cleanPath.startsWith('data:')) {
    return;
  }
  const localFile = path.join('public', cleanPath);
  if (fs.existsSync(localFile)) {
    return;
  }
  fs.mkdirSync(path.dirname(localFile), { recursive: true });
  const remoteUrl = 'https://marina-zakharova.netlify.app' + cleanPath;
  try {
    const res = await fetch(remoteUrl);
    if (res.status === 200) {
      const buffer = await res.arrayBuffer();
      fs.writeFileSync(localFile, Buffer.from(buffer));
      console.log('DOWNLOADED:', cleanPath, `(${buffer.byteLength} bytes)`);
    } else {
      console.log('HTTP', res.status, 'for', remoteUrl);
    }
  } catch (err) {
    console.error('FAILED:', remoteUrl, err.message);
  }
}

async function main() {
  const css = fs.readFileSync('scratch/original_live.css', 'utf8');
  const js = fs.readFileSync('scratch/original_live.js', 'utf8');

  const cssUrls = [];
  const regex = /url\(([^)]+)\)/g;
  let m;
  while ((m = regex.exec(css)) !== null) {
    cssUrls.push(m[1]);
  }

  // Also extract string paths from JS
  const jsAssetRegex = /["'](\/(assets|image|video|icons)[^"']+)["']/g;
  while ((m = jsAssetRegex.exec(js)) !== null) {
    cssUrls.push(m[1]);
  }

  const unique = Array.from(new Set(cssUrls));
  console.log(`Checking ${unique.length} unique asset paths...`);

  for (const u of unique) {
    await downloadAsset(u);
  }

  console.log('All asset downloads complete.');
}

main();
