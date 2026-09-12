const { spawn } = require('child_process');

async function main() {
  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const chrome = spawn(chromePath, [
    '--headless=new',
    '--disable-gpu',
    '--remote-debugging-port=9235',
    '--window-size=1440,900'
  ]);
  await new Promise(r => setTimeout(r, 2000));
  try {
    const listRes = await fetch('http://127.0.0.1:9235/json/list');
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
    await send('Page.navigate', { url: 'http://localhost:3001/' });
    await new Promise(r => setTimeout(r, 3000));

    const res = await send('Runtime.evaluate', {
      expression: `(() => {
        return {
          hasLenis: !!window.__lenis,
          lenisVersion: window.__lenis ? window.__lenis.version : null,
          scrollY: window.scrollY
        };
      })()`,
      returnByValue: true
    });
    console.log('CURRENT LOCAL LENIS STATE:', res.result.value);

    ws.close();
  } catch (err) {
    console.error(err);
  } finally {
    chrome.kill();
  }
}
main();
