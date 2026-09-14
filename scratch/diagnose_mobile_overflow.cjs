const { spawn } = require('child_process');
const fs = require('fs');

async function main() {
  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const chrome = spawn(chromePath, [
    '--headless=new',
    '--disable-gpu',
    '--remote-debugging-port=9226',
    '--window-size=375,812'
  ]);
  await new Promise(r => setTimeout(r, 1500));

  try {
    const listRes = await fetch('http://127.0.0.1:9226/json/list');
    const pages = await listRes.json();
    const ws = new WebSocket(pages[0].webSocketDebuggerUrl);
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
    await send('Emulation.setDeviceMetricsOverride', { width: 375, height: 812, deviceScaleFactor: 2, mobile: true });
    await send('Page.navigate', { url: 'http://localhost:3001/' });
    await new Promise(r => setTimeout(r, 2000));

    const evalRes = await send('Runtime.evaluate', {
      expression: `(() => {
        const clientWidth = document.documentElement.clientWidth;
        const scrollWidth = document.documentElement.scrollWidth;
        const overflowing = [];

        document.querySelectorAll('*').forEach(el => {
          const rect = el.getBoundingClientRect();
          if (rect.right > clientWidth + 2) {
            overflowing.push({
              tag: el.tagName,
              className: el.className,
              id: el.id,
              right: rect.right,
              width: rect.width,
              left: rect.left
            });
          }
        });
        return { clientWidth, scrollWidth, overflowingCount: overflowing.length, overflowing: overflowing.slice(0, 20) };
      })()`,
      returnByValue: true
    });
    console.log('Mobile Diagnostics:', evalRes.result.value);

    const ssRes = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('scratch/mobile_broken.png', Buffer.from(ssRes.data, 'base64'));
    console.log('Saved scratch/mobile_broken.png');

    ws.close();
  } catch(e) {
    console.error(e);
  } finally {
    chrome.kill();
  }
}
main();
