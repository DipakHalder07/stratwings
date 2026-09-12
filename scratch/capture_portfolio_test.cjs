const { spawn } = require('child_process');
const fs = require('fs');

async function main() {
  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const chrome = spawn(chromePath, [
    '--headless=new',
    '--disable-gpu',
    '--remote-debugging-port=9270'
  ]);

  await new Promise(r => setTimeout(r, 1500));

  try {
    const listRes = await fetch('http://127.0.0.1:9270/json/list');
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
    await send('Input.enable');
    await send('Emulation.setDeviceMetricsOverride', { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false });
    await send('Page.navigate', { url: 'http://localhost:3001/' });

    await new Promise(r => setTimeout(r, 3000));

    // Scroll to portfolio
    await send('Runtime.evaluate', {
      expression: `(() => {
        const p = document.querySelector('.portfolio');
        if (p) p.scrollIntoView({ behavior: 'instant', block: 'start' });
      })()`
    });
    await new Promise(r => setTimeout(r, 1000));

    let shot = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('scratch/portfolio_fixed.png', Buffer.from(shot.data, 'base64'));
    console.log('Saved portfolio_fixed.png');

    // Click on "health & wellness" (the 3rd button)
    const btn3Pos = await send('Runtime.evaluate', {
      expression: `(() => {
        const b = document.querySelectorAll('.portfolio-buttons .portfolio-button')[2];
        const r = b.getBoundingClientRect();
        return { x: r.x + r.width / 2, y: r.y + r.height / 2 };
      })()`,
      returnByValue: true
    });

    if (btn3Pos.result.value) {
      await send('Input.dispatchMouseEvent', {
        type: 'mousePressed',
        x: btn3Pos.result.value.x,
        y: btn3Pos.result.value.y,
        button: 'left',
        clickCount: 1
      });
      await send('Input.dispatchMouseEvent', {
        type: 'mouseReleased',
        x: btn3Pos.result.value.x,
        y: btn3Pos.result.value.y,
        button: 'left',
        clickCount: 1
      });
      await new Promise(r => setTimeout(r, 500));
      shot = await send('Page.captureScreenshot', { format: 'png' });
      fs.writeFileSync('scratch/portfolio_health_active.png', Buffer.from(shot.data, 'base64'));
      console.log('Saved portfolio_health_active.png');
    }

    ws.close();
  } catch (err) {
    console.error(err);
  } finally {
    chrome.kill();
  }
}

main();
