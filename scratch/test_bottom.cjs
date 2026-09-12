const { spawn } = require('child_process');
const fs = require('fs');

async function captureBottom(url, outFile) {
  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const chrome = spawn(chromePath, [
    '--headless=new',
    '--disable-gpu',
    '--remote-debugging-port=9245'
  ]);

  await new Promise(r => setTimeout(r, 1500));

  try {
    const listRes = await fetch('http://127.0.0.1:9245/json/list');
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
    await send('Emulation.setDeviceMetricsOverride', { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false });
    await send('Page.navigate', { url });

    await new Promise(r => setTimeout(r, 3000));

    // Scroll to absolute bottom
    await send('Runtime.evaluate', {
      expression: `(() => {
        window.scrollTo(0, document.documentElement.scrollHeight);
      })()`
    });
    await new Promise(r => setTimeout(r, 1500));

    const shot = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(outFile, Buffer.from(shot.data, 'base64'));
    console.log('Saved', outFile);

    ws.close();
  } catch (err) {
    console.error(err);
  } finally {
    chrome.kill();
  }
}

async function main() {
  await captureBottom('http://localhost:3001/', 'scratch/local_bottom.png');
}

main();
