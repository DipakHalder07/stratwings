const { spawn } = require('child_process');
const fs = require('fs');

async function testScroll() {
  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const chrome = spawn(chromePath, [
    '--headless=new',
    '--remote-debugging-port=9555',
    '--window-size=1440,900',
    'http://localhost:3001/'
  ]);

  await new Promise(r => setTimeout(r, 2500));

  try {
    const listRes = await fetch('http://127.0.0.1:9555/json/list');
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

    // Scroll to .vibe top
    const vibeInfo = await send('Runtime.evaluate', {
      expression: `(() => {
        const vibe = document.querySelector('.vibe');
        return {
          offsetTop: vibe.offsetTop,
          offsetHeight: vibe.offsetHeight
        };
      })()`,
      returnByValue: true
    });

    const top = vibeInfo.result.value.offsetTop;
    console.log('Vibe offsetTop:', top);

    // Capture at scroll = top + 300
    await send('Runtime.evaluate', { expression: `window.scrollTo(0, ${top + 300})` });
    await new Promise(r => setTimeout(r, 500));
    let shot = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('scratch/scroll_top_plus_300.png', Buffer.from(shot.data, 'base64'));

    // Capture at scroll = top + 600
    await send('Runtime.evaluate', { expression: `window.scrollTo(0, ${top + 600})` });
    await new Promise(r => setTimeout(r, 500));
    shot = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('scratch/scroll_top_plus_600.png', Buffer.from(shot.data, 'base64'));

    console.log('Screenshots saved');
    ws.close();
  } catch (err) {
    console.error('Error:', err);
  } finally {
    chrome.kill();
  }
}

testScroll();
