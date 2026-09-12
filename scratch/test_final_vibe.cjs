const { spawn } = require('child_process');
const fs = require('fs');

async function testFinalVibe() {
  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const chrome = spawn(chromePath, [
    '--headless=new',
    '--remote-debugging-port=9666',
    '--window-size=1440,900',
    'http://localhost:3001/'
  ]);

  await new Promise(r => setTimeout(r, 2500));

  try {
    const listRes = await fetch('http://127.0.0.1:9666/json/list');
    const pages = await listRes.json();
    const targetPage = pages.find(p => p.url.includes('localhost:3001')) || pages[0];
    const ws = new WebSocket(targetPage.webSocketDebuggerUrl);
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

    await send('Runtime.enable');
    await send('Page.enable');
    await new Promise(r => setTimeout(r, 2000));

    // Scroll to .vibe
    await send('Runtime.evaluate', {
      expression: `(() => {
        const vibe = document.querySelector('.vibe');
        vibe.scrollIntoView({ behavior: 'instant', block: 'start' });
      })()`
    });

    await new Promise(r => setTimeout(r, 1000));

    let shot = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('scratch/final_vibe_view.png', Buffer.from(shot.data, 'base64'));
    console.log('Saved scratch/final_vibe_view.png');

    // Scroll slightly to check folders transition
    await send('Runtime.evaluate', {
      expression: `(() => {
        window.scrollBy(0, 350);
      })()`
    });
    await new Promise(r => setTimeout(r, 800));

    shot = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('scratch/final_vibe_transition.png', Buffer.from(shot.data, 'base64'));
    console.log('Saved scratch/final_vibe_transition.png');

    ws.close();
  } catch (err) {
    console.error('Error:', err);
  } finally {
    chrome.kill();
  }
}

testFinalVibe();
