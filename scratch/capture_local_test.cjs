const { spawn } = require('child_process');
const fs = require('fs');

async function main() {
  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const chrome = spawn(chromePath, [
    '--headless=new',
    '--disable-gpu',
    '--remote-debugging-port=9240'
  ]);

  await new Promise(r => setTimeout(r, 1500));

  try {
    const listRes = await fetch('http://127.0.0.1:9240/json/list');
    const pages = await listRes.json();
    const page = pages.find(p => p.type === 'page') || pages[0];
    const wsUrl = page.webSocketDebuggerUrl;

    const ws = new WebSocket(wsUrl);
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
    await send('Page.navigate', { url: 'http://localhost:3001/' });

    await new Promise(r => setTimeout(r, 3000));

    // 1. Hero
    let shot = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('scratch/local_hero.png', Buffer.from(shot.data, 'base64'));
    console.log('Saved local_hero.png');

    // 2. Vibe section
    await send('Runtime.evaluate', {
      expression: `(() => {
        const el = document.querySelector('.vibe');
        if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
      })()`
    });
    await new Promise(r => setTimeout(r, 1500));
    shot = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('scratch/local_vibe.png', Buffer.from(shot.data, 'base64'));
    console.log('Saved local_vibe.png');

    // 3. Concepts section
    await send('Runtime.evaluate', {
      expression: `(() => {
        const el = document.querySelector('.concepts');
        if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
        window.scrollBy(0, 200);
      })()`
    });
    await new Promise(r => setTimeout(r, 1500));
    shot = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('scratch/local_concepts.png', Buffer.from(shot.data, 'base64'));
    console.log('Saved local_concepts.png');

    // 4. Feedback section
    await send('Runtime.evaluate', {
      expression: `(() => {
        const el = document.querySelector('.feedback');
        if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
      })()`
    });
    await new Promise(r => setTimeout(r, 1500));
    shot = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('scratch/local_feedback.png', Buffer.from(shot.data, 'base64'));
    console.log('Saved local_feedback.png');

    // 5. Footer
    await send('Runtime.evaluate', {
      expression: `(() => {
        const el = document.querySelector('.footer');
        if (el) el.scrollIntoView({ behavior: 'instant', block: 'end' });
      })()`
    });
    await new Promise(r => setTimeout(r, 1500));
    shot = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('scratch/local_footer.png', Buffer.from(shot.data, 'base64'));
    console.log('Saved local_footer.png');

    ws.close();
  } catch (err) {
    console.error('Error during capture:', err);
  } finally {
    chrome.kill();
  }
}

main();
