const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

async function main() {
  const profileDir = path.resolve(__dirname, 'chrome_tmp');
  fs.mkdirSync(profileDir, { recursive: true });

  const chrome = spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', [
    '--headless=new',
    '--disable-gpu',
    `--user-data-dir=${profileDir}`,
    '--remote-debugging-port=9260'
  ]);
  await new Promise(r => setTimeout(r, 1500));
  const listRes = await fetch('http://127.0.0.1:9260/json/list');
  const pages = await listRes.json();
  const page = pages.find(p => p.type === 'page' && !p.url.startsWith('chrome-extension')) || pages.find(p => p.type === 'page') || pages[0];
  const ws = new WebSocket(page.webSocketDebuggerUrl);
  let id = 1;
  const send = (method, params = {}) => new Promise(res => {
    const i = id++;
    const h = (m) => {
      const d = JSON.parse(m.data);
      if (d.id === i) { ws.removeEventListener('message', h); res(d.result); }
    };
    ws.addEventListener('message', h);
    ws.send(JSON.stringify({ id: i, method, params }));
  });
  await new Promise(r => ws.onopen = r);
  await send('Page.enable');
  await send('Runtime.enable');
  await send('Emulation.setDeviceMetricsOverride', { width: 375, height: 812, deviceScaleFactor: 1, mobile: true });
  await send('Page.navigate', { url: 'http://localhost:3001/' });
  await new Promise(r => setTimeout(r, 2000));

  const evalRes = await send('Runtime.evaluate', {
    expression: `(() => {
      const title = document.querySelector('.sw-banner-title');
      const subtitle = document.querySelector('.sw-banner-subtitle');
      const titleBg = document.querySelector('.sw-banner-title-bg');

      const getInfo = (el) => {
        if (!el) return null;
        const rect = el.getBoundingClientRect();
        const cs = window.getComputedStyle(el);
        return {
          rect: { top: rect.top, bottom: rect.bottom, height: rect.height, width: rect.width, left: rect.left },
          marginTop: cs.marginTop,
          marginBottom: cs.marginBottom,
          maxWidth: cs.maxWidth
        };
      };

      const titleInfo = getInfo(title);
      const subInfo = getInfo(subtitle);
      return {
        title: titleInfo,
        subtitle: subInfo,
        titleBg: getInfo(titleBg),
        gap: (subInfo && titleInfo) ? (subInfo.rect.top - titleInfo.rect.bottom) : null
      };
    })()`,
    returnByValue: true
  });

  console.log('MEASURED METRICS:', JSON.stringify(evalRes.value || evalRes, null, 2));

  const shot = await send('Page.captureScreenshot', { clip: { x: 0, y: 0, width: 375, height: 500, scale: 1 } });
  fs.writeFileSync('scratch/fixed_banner_clean.png', Buffer.from(shot.data, 'base64'));
  console.log('Saved scratch/fixed_banner_clean.png');

  ws.close();
  chrome.kill();
}
main().catch(console.error);
