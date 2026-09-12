const { spawn } = require('child_process');
const fs = require('fs');

async function main() {
  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const chrome = spawn(chromePath, [
    '--headless=new',
    '--disable-gpu',
    '--remote-debugging-port=9227',
    '--window-size=1440,900'
  ]);

  await new Promise(r => setTimeout(r, 1500));

  try {
    const listRes = await fetch('http://127.0.0.1:9227/json/list');
    const pages = await listRes.json();
    const page = pages.find(p => p.type === 'page') || pages[0];
    const ws = new WebSocket(page.webSocketDebuggerUrl);
    let id = 1;
    const pending = new Map();

    ws.onmessage = (msg) => {
      const data = JSON.parse(msg.data);
      if (data.id && pending.has(data.id)) {
        pending.get(data.id)(data.result);
        pending.delete(data.id);
      }
    };
    await new Promise(r => ws.onopen = r);

    const send = (method, params = {}) => new Promise((resolve) => {
      const msgId = id++;
      pending.set(msgId, resolve);
      ws.send(JSON.stringify({ id: msgId, method, params }));
    });

    await send('Page.enable');
    await send('Runtime.enable');
    await send('Emulation.setDeviceMetricsOverride', { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false });
    await send('Page.navigate', { url: 'http://localhost:3001/' });
    await new Promise(r => setTimeout(r, 2500));

    const sections = [
      { name: 'sw_about', selector: '.sw-about' },
      { name: 'sw_portfolio', selector: '.sw-portfolio' },
      { name: 'sw_vibe', selector: '.sw-vibe' },
      { name: 'sw_folders', selector: '.sw-folders' },
      { name: 'sw_concepts', selector: '.sw-concepts' },
      { name: 'sw_plan', selector: '.sw-plan' },
      { name: 'sw_feedback', selector: '.sw-feedback' },
      { name: 'sw_footer', selector: '.sw-footer' }
    ];

    for (const sec of sections) {
      await send('Runtime.evaluate', {
        expression: `(() => {
          const el = document.querySelector('${sec.selector}');
          if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
        })()`
      });
      await new Promise(r => setTimeout(r, 1200));
      const ssRes = await send('Page.captureScreenshot', { format: 'png' });
      fs.writeFileSync(`scratch/${sec.name}.png`, Buffer.from(ssRes.data, 'base64'));
      console.log(`Saved scratch/${sec.name}.png`);
    }

    ws.close();
  } catch (err) {
    console.error(err);
  } finally {
    chrome.kill();
  }
}

main();
