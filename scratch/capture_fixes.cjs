const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

async function main() {
  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const chrome = spawn(chromePath, [
    '--headless=new',
    '--disable-gpu',
    '--remote-debugging-port=9223',
    '--window-size=1440,900'
  ]);

  await new Promise(r => setTimeout(r, 1500));

  try {
    const listRes = await fetch('http://127.0.0.1:9223/json/list');
    const pages = await listRes.json();
    const page = pages.find(p => p.type === 'page') || pages[0];
    const wsUrl = page.webSocketDebuggerUrl;
    console.log('Connecting to', wsUrl);

    const ws = new WebSocket(wsUrl);
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

    const send = (method, params = {}) => {
      return new Promise((resolve) => {
        const msgId = id++;
        pending.set(msgId, resolve);
        ws.send(JSON.stringify({ id: msgId, method, params }));
      });
    };

    await send('Page.enable');
    await send('Runtime.enable');
    await send('Emulation.setDeviceMetricsOverride', { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false });
    await send('Page.navigate', { url: 'http://localhost:3001/' });

    await new Promise(r => setTimeout(r, 2500));

    // 1. Concepts section screenshot
    await send('Runtime.evaluate', {
      expression: `(() => {
        const concepts = document.querySelector('.concepts');
        if (concepts) concepts.scrollIntoView({ behavior: 'instant', block: 'start' });
        window.scrollBy(0, 200);
      })()`
    });
    await new Promise(r => setTimeout(r, 1000));
    let shot = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('scratch/concepts_fixed.png', Buffer.from(shot.data, 'base64'));
    console.log('Saved scratch/concepts_fixed.png');

    // 2. Plan -> Feedback transition
    await send('Runtime.evaluate', {
      expression: `(() => {
        const runningLine = document.querySelector('.running-line');
        if (runningLine) runningLine.scrollIntoView({ behavior: 'instant', block: 'center' });
      })()`
    });
    await new Promise(r => setTimeout(r, 1000));
    shot = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('scratch/plan_feedback_fixed.png', Buffer.from(shot.data, 'base64'));
    console.log('Saved scratch/plan_feedback_fixed.png');

    // Feedback letter state
    await send('Runtime.evaluate', {
      expression: `(() => {
        const fb = document.querySelector('.feedback');
        if (fb) fb.scrollIntoView({ behavior: 'instant', block: 'start' });
      })()`
    });
    await new Promise(r => setTimeout(r, 1000));
    shot = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('scratch/feedback_envelope_fixed.png', Buffer.from(shot.data, 'base64'));
    console.log('Saved scratch/feedback_envelope_fixed.png');

    // 3. Feedback -> Footer transition
    await send('Runtime.evaluate', {
      expression: `(() => {
        const footer = document.querySelector('.footer');
        if (footer) footer.scrollIntoView({ behavior: 'instant', block: 'end' });
      })()`
    });
    await new Promise(r => setTimeout(r, 1000));
    shot = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('scratch/footer_fixed.png', Buffer.from(shot.data, 'base64'));
    console.log('Saved scratch/footer_fixed.png');

    ws.close();
  } catch (err) {
    console.error('Error during capture:', err);
  } finally {
    chrome.kill();
  }
}

main();
