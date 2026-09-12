const { spawn } = require('child_process');

async function main() {
  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const chrome = spawn(chromePath, [
    '--headless=new',
    '--disable-gpu',
    '--remote-debugging-port=9231',
    '--window-size=1440,900'
  ]);
  await new Promise(r => setTimeout(r, 2000));
  try {
    const listRes = await fetch('http://127.0.0.1:9231/json/list');
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
    await send('Page.navigate', { url: 'https://marina-zakharova.netlify.app/' });
    await new Promise(r => setTimeout(r, 5000));

    const res = await send('Runtime.evaluate', {
      expression: `(() => {
        return {
          bodyOverflow: window.getComputedStyle(document.body).overflow,
          bodyOverflowY: window.getComputedStyle(document.body).overflowY,
          bodyHeight: window.getComputedStyle(document.body).height,
          htmlOverflow: window.getComputedStyle(document.documentElement).overflow,
          htmlHeight: window.getComputedStyle(document.documentElement).height,
          lenisVersion: window.lenisVersion,
          hasLenis: !!window.__lenis,
          lenisOptions: window.__lenis ? {
            duration: window.__lenis.options.duration,
            smoothWheel: window.__lenis.options.smoothWheel,
            easing: window.__lenis.options.easing ? window.__lenis.options.easing.toString() : null,
            wrapper: window.__lenis.options.wrapper === window ? 'window' : window.__lenis.options.wrapper?.tagName,
            content: window.__lenis.options.content === document.documentElement ? 'documentElement' : window.__lenis.options.content?.tagName
          } : null
        };
      })()`,
      returnByValue: true
    });
    console.log('LIVE SITE SCROLL & LENIS:');
    console.log(JSON.stringify(res.result.value, null, 2));

    ws.close();
  } catch (err) {
    console.error(err);
  } finally {
    chrome.kill();
  }
}
main();
