const { spawn } = require('child_process');

async function main() {
  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const chrome = spawn(chromePath, [
    '--headless=new',
    '--disable-gpu',
    '--remote-debugging-port=9228',
    '--window-size=1440,900'
  ]);

  await new Promise(r => setTimeout(r, 2500));

  try {
    const listRes = await fetch('http://127.0.0.1:9228/json/list');
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
    await send('Log.enable');
    await send('Network.enable');
    await send('Network.clearBrowserCache');

    ws.onmessage = (msg) => {
      const data = JSON.parse(msg.data);
      if (data.id && pending.has(data.id)) {
        pending.get(data.id)(data.result);
        pending.delete(data.id);
      }
      if (data.method === 'Runtime.exceptionThrown') {
        console.error('EXCEPTION:', JSON.stringify(data.params.exceptionDetails));
      }
      if (data.method === 'Log.entryAdded') {
        console.log('LOG:', data.params.entry);
      }
    };

    await send('Page.navigate', { url: 'http://localhost:3001/?nocache=' + Date.now() });
    await new Promise(r => setTimeout(r, 4000));

    // Capture console errors
    const logs = await send('Runtime.evaluate', {
      expression: `(() => {
        return {
          vibeLabelHTML: document.querySelector('.vibe-label') ? document.querySelector('.vibe-label').outerHTML : null,
          bannerItemLottie: document.querySelector('.banner-item-lottie-one') ? document.querySelector('.banner-item-lottie-one').outerHTML : null,
          allSVGs: Array.from(document.querySelectorAll('svg')).map(s => ({
            className: s.getAttribute('class'),
            parentClass: s.parentElement ? s.parentElement.className : null
          }))
        };
      })()`,
      returnByValue: true
    });
    console.log(JSON.stringify(logs.result.value, null, 2));

    ws.close();
  } catch (err) {
    console.error(err);
  } finally {
    chrome.kill();
  }
}
main();
