const { spawn } = require('child_process');
const fs = require('fs');

async function main() {
  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const chrome = spawn(chromePath, [
    '--headless=new',
    '--disable-gpu',
    '--remote-debugging-port=9255'
  ]);

  await new Promise(r => setTimeout(r, 1500));

  try {
    const listRes = await fetch('http://127.0.0.1:9255/json/list');
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
    await send('Page.navigate', { url: 'http://localhost:3001/' });

    await new Promise(r => setTimeout(r, 3000));

    // Scroll into feedback section
    const fbInfo = await send('Runtime.evaluate', {
      expression: `(() => {
        const el = document.querySelector('.feedback-envelope-wrapper');
        if (!el) return null;
        const rect = el.getBoundingClientRect();
        return { top: window.scrollY + rect.top, height: rect.height };
      })()`,
      returnByValue: true
    });

    console.log('Envelope wrapper:', fbInfo.result.value);
    const top = fbInfo.result.value.top;

    // Step 1: Scroll to where envelope enters
    await send('Runtime.evaluate', {
      expression: `window.scrollTo(0, ${top - 200});`
    });
    await new Promise(r => setTimeout(r, 800));
    let shot = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('scratch/envelope_stage1.png', Buffer.from(shot.data, 'base64'));
    console.log('Saved envelope_stage1.png');

    // Step 2: Scroll into active open stage
    await send('Runtime.evaluate', {
      expression: `window.scrollTo(0, ${top + 300});`
    });
    await new Promise(r => setTimeout(r, 800));
    shot = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('scratch/envelope_stage2.png', Buffer.from(shot.data, 'base64'));
    console.log('Saved envelope_stage2.png');

    // Step 3: Scroll to full open stage (matching user's screenshot)
    await send('Runtime.evaluate', {
      expression: `window.scrollTo(0, ${top + 700});`
    });
    await new Promise(r => setTimeout(r, 800));
    shot = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('scratch/envelope_stage3.png', Buffer.from(shot.data, 'base64'));
    console.log('Saved envelope_stage3.png');

    ws.close();
  } catch (err) {
    console.error(err);
  } finally {
    chrome.kill();
  }
}

main();
