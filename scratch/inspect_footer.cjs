const { spawn } = require('child_process');

const chrome = spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', [
  '--headless=new',
  '--disable-gpu',
  '--remote-debugging-port=9230'
]);

setTimeout(async () => {
  try {
    const list = await fetch('http://127.0.0.1:9230/json/list').then(r => r.json());
    const page = list.find(p => p.type === 'page');
    const ws = new WebSocket(page.webSocketDebuggerUrl);
    ws.onopen = async () => {
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
      await send('Page.enable');
      await send('Page.navigate', { url: 'http://localhost:3001/' });
      await new Promise(r => setTimeout(r, 2000));
      const res = await send('Runtime.evaluate', {
        expression: `(() => {
          const c = document.querySelector('.footer .container');
          const fl = document.querySelector('.footer-left');
          const l0 = document.querySelector('.footer-nav-link');
          const img0 = l0 ? l0.querySelector('img') : null;
          return {
            windowWidth: window.innerWidth,
            container: c ? c.getBoundingClientRect().toJSON() : null,
            footerLeft: fl ? fl.getBoundingClientRect().toJSON() : null,
            l0: l0 ? l0.getBoundingClientRect().toJSON() : null,
            img0: img0 ? img0.getBoundingClientRect().toJSON() : null,
            csContainer: c ? {
              maxWidth: window.getComputedStyle(c).maxWidth,
              paddingLeft: window.getComputedStyle(c).paddingLeft,
              marginLeft: window.getComputedStyle(c).marginLeft
            } : null
          };
        })()`,
        returnByValue: true
      });
      console.log(JSON.stringify(res.result.value, null, 2));
      chrome.kill();
    };
  } catch(e) {
    console.error(e);
    chrome.kill();
  }
}, 1500);
