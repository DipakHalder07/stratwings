const { spawn } = require('child_process');
const fs = require('fs');

async function testVibe() {
  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const chrome = spawn(chromePath, [
    '--headless=new',
    '--remote-debugging-port=9333',
    '--window-size=1440,900',
    'http://localhost:3001/'
  ]);

  await new Promise(r => setTimeout(r, 3000));

  try {
    const listRes = await fetch('http://127.0.0.1:9333/json/list');
    const pages = await listRes.json();
    console.log('Pages found:', pages.length);
    const targetPage = pages.find(p => p.url.includes('localhost:3001')) || pages[0];
    const wsUrl = targetPage.webSocketDebuggerUrl;
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

    await send('Runtime.enable');
    await send('Page.enable');

    // Wait 2s for React to mount
    await new Promise(r => setTimeout(r, 2000));

    // Scroll to .vibe
    const scrollRes = await send('Runtime.evaluate', {
      expression: `(() => {
        const vibe = document.querySelector('.vibe');
        if (!vibe) return 'no vibe found';
        vibe.scrollIntoView({ behavior: 'instant', block: 'start' });
        const r = vibe.getBoundingClientRect();
        return {
          vibeTop: r.top,
          vibeHeight: r.height,
          label: document.querySelector('.vibe-label') ? document.querySelector('.vibe-label').getBoundingClientRect() : null,
          flowers: document.querySelector('.vibe-flowers') ? document.querySelector('.vibe-flowers').getBoundingClientRect() : null,
          itemsCount: document.querySelectorAll('.vibe-item').length,
          item1: document.querySelector('.vibe-item:nth-of-type(1)') ? document.querySelector('.vibe-item:nth-of-type(1)').getBoundingClientRect() : null
        };
      })()`,
      returnByValue: true
    });

    console.log('Scroll & Rects:', JSON.stringify(scrollRes.result.value, null, 2));

    await new Promise(r => setTimeout(r, 1000));

    const shot = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('scratch/vibe_actual.png', Buffer.from(shot.data, 'base64'));
    console.log('Screenshot saved to scratch/vibe_actual.png');

    ws.close();
  } catch (err) {
    console.error('Error:', err);
  } finally {
    chrome.kill();
  }
}

testVibe();
