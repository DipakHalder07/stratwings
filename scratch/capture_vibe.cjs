const { spawn } = require('child_process');
const fs = require('fs');

async function main() {
  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const chrome = spawn(chromePath, [
    '--headless=new',
    '--disable-gpu',
    '--remote-debugging-port=9222',
    '--window-size=1440,900'
  ]);

  await new Promise(r => setTimeout(r, 1500));

  try {
    const listRes = await fetch('http://127.0.0.1:9222/json/list');
    const pages = await listRes.json();
    const wsUrl = pages[0].webSocketDebuggerUrl;
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
    await send('Page.navigate', { url: 'http://localhost:3001/' });

    await new Promise(r => setTimeout(r, 2000));

    // Evaluate layout of vibe section
    const evalRes = await send('Runtime.evaluate', {
      expression: `(() => {
        const vibe = document.querySelector('.vibe');
        const flowers = document.querySelector('.vibe-flowers');
        const label = document.querySelector('.vibe-label');
        const labelImg = document.querySelector('.vibe-label-img');
        const items = document.querySelector('.vibe-items');
        const bgSecond = document.querySelector('.bg-second');
        
        return {
          windowHeight: window.innerHeight,
          windowWidth: window.innerWidth,
          bgSecond: bgSecond ? {
            rect: bgSecond.getBoundingClientRect(),
            height: bgSecond.offsetHeight,
            computedBg: window.getComputedStyle(bgSecond).backgroundImage,
            bgSize: window.getComputedStyle(bgSecond).backgroundSize,
            bgPos: window.getComputedStyle(bgSecond).backgroundPosition
          } : null,
          vibe: vibe ? {
            rect: vibe.getBoundingClientRect(),
            offsetTop: vibe.offsetTop,
            offsetHeight: vibe.offsetHeight,
            computedStyle: {
              position: window.getComputedStyle(vibe).position,
              top: window.getComputedStyle(vibe).top,
              padding: window.getComputedStyle(vibe).padding,
              height: window.getComputedStyle(vibe).height,
              overflow: window.getComputedStyle(vibe).overflow
            }
          } : null,
          label: label ? {
            rect: label.getBoundingClientRect(),
            computedDisplay: window.getComputedStyle(label).display,
            computedMargin: window.getComputedStyle(label).margin
          } : null,
          labelImg: labelImg ? {
            rect: labelImg.getBoundingClientRect(),
            naturalWidth: labelImg.naturalWidth,
            naturalHeight: labelImg.naturalHeight
          } : null,
          flowers: flowers ? {
            rect: flowers.getBoundingClientRect(),
            computedPosition: window.getComputedStyle(flowers).position,
            naturalWidth: flowers.naturalWidth,
            naturalHeight: flowers.naturalHeight
          } : null,
          items: items ? {
            rect: items.getBoundingClientRect(),
            childrenCount: items.children.length,
            child0Rect: items.children[0] ? items.children[0].getBoundingClientRect() : null,
            child0Img: items.children[0] && items.children[0].querySelector('img') ? items.children[0].querySelector('img').getBoundingClientRect() : null
          } : null
        };
      })()`,
      returnByValue: true
    });

    console.log('Evaluated layout:', JSON.stringify(evalRes.result.value, null, 2));

    // Scroll to vibe section
    await send('Runtime.evaluate', {
      expression: `(() => {
        const vibe = document.querySelector('.vibe');
        if (vibe) vibe.scrollIntoView({ behavior: 'instant', block: 'start' });
      })()`
    });

    await new Promise(r => setTimeout(r, 1000));

    // Take screenshot of viewport
    const shot = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('scratch/vibe_viewport.png', Buffer.from(shot.data, 'base64'));
    console.log('Screenshot saved to scratch/vibe_viewport.png');

    ws.close();
  } catch (err) {
    console.error('Error during capture:', err);
  } finally {
    chrome.kill();
  }
}

main();
