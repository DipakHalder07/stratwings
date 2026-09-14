const { spawn } = require('child_process');
const fs = require('fs');

async function getCDP(port = 9245) {
  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const chrome = spawn(chromePath, [
    '--headless=new',
    '--disable-gpu',
    `--remote-debugging-port=${port}`
  ]);
  await new Promise(r => setTimeout(r, 1500));
  const listRes = await fetch(`http://127.0.0.1:${port}/json/list`);
  const pages = await listRes.json();
  const page = pages.find(p => p.type === 'page') || pages[0];
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
  return { ws, send, chrome };
}

async function measure(send, url, isMobile) {
  if (isMobile) {
    await send('Emulation.setDeviceMetricsOverride', { width: 375, height: 812, deviceScaleFactor: 1, mobile: true });
  } else {
    await send('Emulation.setDeviceMetricsOverride', { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false });
  }
  await send('Page.navigate', { url });
  await new Promise(r => setTimeout(r, 2500));

  const evalRes = await send('Runtime.evaluate', {
    expression: `(() => {
      const title = document.querySelector('.banner-title, .sw-banner-title');
      const subtitle = document.querySelector('.banner-subtitle, .sw-banner-subtitle');
      const banner = document.querySelector('.banner, .sw-banner');
      const titleBg = document.querySelector('.banner-title-bg, .sw-banner-title-bg');

      const getInfo = (el) => {
        if (!el) return null;
        const rect = el.getBoundingClientRect();
        const cs = window.getComputedStyle(el);
        return {
          rect: { top: rect.top, bottom: rect.bottom, height: rect.height, width: rect.width, left: rect.left },
          marginTop: cs.marginTop,
          marginBottom: cs.marginBottom,
          paddingTop: cs.paddingTop,
          paddingBottom: cs.paddingBottom,
          maxWidth: cs.maxWidth
        };
      };

      const titleInfo = getInfo(title);
      const subInfo = getInfo(subtitle);
      const gap = (subInfo && titleInfo) ? (subInfo.rect.top - titleInfo.rect.bottom) : null;

      return {
        title: titleInfo,
        subtitle: subInfo,
        titleBg: getInfo(titleBg),
        gap: gap
      };
    })()`,
    returnByValue: true
  });

  return evalRes.result.value;
}

async function main() {
  const { ws, send, chrome } = await getCDP(9246);
  try {
    console.log('--- MOBILE (375px) ---');
    const liveMob = await measure(send, 'https://marina-zakharova.netlify.app/', true);
    console.log('Live Mobile:', JSON.stringify(liveMob, null, 2));

    const localMob = await measure(send, 'http://localhost:3001/', true);
    console.log('Local Mobile:', JSON.stringify(localMob, null, 2));

    const shot1 = await send('Page.captureScreenshot', { clip: { x: 0, y: 0, width: 375, height: 500, scale: 1 } });
    fs.writeFileSync('scratch/current_local_banner_mob.png', Buffer.from(shot1.data, 'base64'));

    console.log('--- DESKTOP (1440px) ---');
    const liveDesk = await measure(send, 'https://marina-zakharova.netlify.app/', false);
    console.log('Live Desktop:', JSON.stringify(liveDesk, null, 2));

    const localDesk = await measure(send, 'http://localhost:3001/', false);
    console.log('Local Desktop:', JSON.stringify(localDesk, null, 2));

    const shot2 = await send('Page.captureScreenshot', { clip: { x: 0, y: 0, width: 1440, height: 600, scale: 1 } });
    fs.writeFileSync('scratch/current_local_banner_desk.png', Buffer.from(shot2.data, 'base64'));

  } finally {
    ws.close();
    chrome.kill();
  }
}

main().catch(console.error);
