const { spawn } = require('child_process');
const fs = require('fs');

async function main() {
  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const chrome = spawn(chromePath, [
    '--headless=new',
    '--disable-gpu',
    '--remote-debugging-port=9234',
    '--window-size=1440,900'
  ]);
  await new Promise(r => setTimeout(r, 1500));

  try {
    const listRes = await fetch('http://127.0.0.1:9234/json/list');
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
    await new Promise(r => setTimeout(r, 2000));

    await send('Runtime.evaluate', {
      expression: 'document.querySelector(".sw-portfolio").scrollIntoView({ behavior: "instant" })'
    });
    await new Promise(r => setTimeout(r, 1000));
    const ss1 = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('scratch/sw_portfolio_logo_theme.png', Buffer.from(ss1.data, 'base64'));

    await send('Runtime.evaluate', {
      expression: 'document.querySelector(".sw-plan").scrollIntoView({ behavior: "instant" })'
    });
    await new Promise(r => setTimeout(r, 1000));
    const ss2 = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('scratch/sw_plan_logo_theme.png', Buffer.from(ss2.data, 'base64'));

    console.log('Saved portfolio and plan screenshots');
    ws.close();
  } catch(e) {
    console.error(e);
  } finally {
    chrome.kill();
  }
}
main();
