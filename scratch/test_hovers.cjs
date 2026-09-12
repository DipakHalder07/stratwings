const { spawn } = require('child_process');
const fs = require('fs');

async function main() {
  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const chrome = spawn(chromePath, [
    '--headless=new',
    '--disable-gpu',
    '--remote-debugging-port=9250'
  ]);

  await new Promise(r => setTimeout(r, 1500));

  try {
    const listRes = await fetch('http://127.0.0.1:9250/json/list');
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

    // 1. Hover on header button
    const btnPos = await send('Runtime.evaluate', {
      expression: `(() => {
        const b = document.querySelector('.header-button-design');
        const r = b.getBoundingClientRect();
        return { x: r.x + r.width / 2, y: r.y + r.height / 2 };
      })()`,
      returnByValue: true
    });

    if (btnPos.result.value) {
      await send('Input.dispatchMouseEvent', {
        type: 'mouseMoved',
        x: btnPos.result.value.x,
        y: btnPos.result.value.y
      });
      await new Promise(r => setTimeout(r, 300));
      const shot = await send('Page.captureScreenshot', { format: 'png' });
      fs.writeFileSync('scratch/hover_header_btn.png', Buffer.from(shot.data, 'base64'));
      console.log('Saved hover_header_btn.png');
    }

    // 2. Hover on Vibe sticker
    await send('Runtime.evaluate', {
      expression: `(() => {
        const vibe = document.querySelector('.vibe');
        if (vibe) vibe.scrollIntoView({ behavior: 'instant', block: 'start' });
      })()`
    });
    await new Promise(r => setTimeout(r, 1000));

    const stickerPos = await send('Runtime.evaluate', {
      expression: `(() => {
        const s = document.querySelectorAll('.vibe-item')[2];
        const r = s.getBoundingClientRect();
        return { x: r.x + r.width / 2, y: r.y + r.height / 2 };
      })()`,
      returnByValue: true
    });

    if (stickerPos.result.value) {
      await send('Input.dispatchMouseEvent', {
        type: 'mouseMoved',
        x: stickerPos.result.value.x,
        y: stickerPos.result.value.y
      });
      await new Promise(r => setTimeout(r, 300));
      const shot = await send('Page.captureScreenshot', { format: 'png' });
      fs.writeFileSync('scratch/hover_vibe_sticker.png', Buffer.from(shot.data, 'base64'));
      console.log('Saved hover_vibe_sticker.png');
    }

    ws.close();
  } catch (err) {
    console.error(err);
  } finally {
    chrome.kill();
  }
}

main();
