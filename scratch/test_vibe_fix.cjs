const { spawn } = require('child_process');
const fs = require('fs');

async function testVibeStyle() {
  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const chrome = spawn(chromePath, [
    '--headless=new',
    '--remote-debugging-port=9444',
    '--window-size=1440,900',
    'http://localhost:3001/'
  ]);

  await new Promise(r => setTimeout(r, 2500));

  try {
    const listRes = await fetch('http://127.0.0.1:9444/json/list');
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

    // Inject style
    await send('Runtime.evaluate', {
      expression: `(() => {
        const style = document.createElement('style');
        style.id = 'test-vibe-fix';
        style.textContent = \`
          .vibe {
            position: relative;
            min-height: 850px;
            padding: 80px 0 0;
            overflow: hidden;
          }
          .vibe-label {
            position: relative;
            z-index: 4;
            margin: 0 auto;
            text-align: center;
          }
          .vibe-label-img {
            display: block;
            margin: 0 auto;
            width: 32vw;
            max-width: 460px;
            height: auto;
          }
          .vibe-items {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 3;
          }
          .vibe-item {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            display: block;
          }
          .vibe-item-main, .vibe-item-hover {
            pointer-events: auto;
          }
          .vibe-flowers {
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: auto;
            z-index: 2;
            pointer-events: none;
          }
        \`;
        document.head.appendChild(style);

        const vibe = document.querySelector('.vibe');
        vibe.scrollIntoView({ behavior: 'instant', block: 'start' });
      })()`
    });

    await new Promise(r => setTimeout(r, 1000));

    const shot = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('scratch/vibe_test_fixed.png', Buffer.from(shot.data, 'base64'));
    console.log('Saved to scratch/vibe_test_fixed.png');

    ws.close();
  } catch (err) {
    console.error('Error:', err);
  } finally {
    chrome.kill();
  }
}

testVibeStyle();
