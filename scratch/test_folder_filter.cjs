const { spawn } = require('child_process');
const fs = require('fs');

async function main() {
  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const chrome = spawn(chromePath, [
    '--headless=new',
    '--disable-gpu',
    '--remote-debugging-port=9235',
    '--window-size=1440,900'
  ]);
  await new Promise(r => setTimeout(r, 1500));

  try {
    const listRes = await fetch('http://127.0.0.1:9235/json/list');
    const pages = await listRes.json();
    const ws = new WebSocket(pages[0].webSocketDebuggerUrl);
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
    const send = (method, params = {}) => new Promise((resolve) => {
      const msgId = id++;
      pending.set(msgId, resolve);
      ws.send(JSON.stringify({ id: msgId, method, params }));
    });
    await send('Page.enable');
    await send('Runtime.enable');
    await send('Page.navigate', { url: 'http://localhost:3001/' });
    await new Promise(r => setTimeout(r, 2000));

    // Scroll to folders
    await send('Runtime.evaluate', {
      expression: `document.querySelector('.sw-folders').scrollIntoView({ behavior: 'instant' })`
    });
    await new Promise(r => setTimeout(r, 1000));

    // Filter Options:
    // Option A: StratWings Gold (sepia + saturate + hue-rotate)
    // Option B: StratWings Royal Navy / Slate Blue (hue-rotate ~190deg)
    // Option C: Hue-rotate ~95deg (Olive/Gold)

    const testFilters = [
      { name: 'gold_sepia', filter: 'sepia(0.8) saturate(1.8) hue-rotate(5deg) brightness(1.05)' },
      { name: 'gold_warm', filter: 'hue-rotate(95deg) saturate(1.4) brightness(1.05)' },
      { name: 'navy_blue', filter: 'hue-rotate(185deg) saturate(1.2) brightness(0.85)' },
      { name: 'slate_blue', filter: 'hue-rotate(180deg) saturate(1.5) brightness(1.1)' }
    ];

    for (const opt of testFilters) {
      await send('Runtime.evaluate', {
        expression: `(() => {
          document.querySelectorAll('.sw-folders-item-under, .sw-folders-item-main').forEach(el => {
            el.style.filter = '${opt.filter}';
          });
        })()`
      });
      await new Promise(r => setTimeout(r, 500));
      const ssRes = await send('Page.captureScreenshot', { format: 'png' });
      fs.writeFileSync(`scratch/folder_${opt.name}.png`, Buffer.from(ssRes.data, 'base64'));
      console.log(`Saved scratch/folder_${opt.name}.png`);
    }

    ws.close();
  } catch(e) {
    console.error(e);
  } finally {
    chrome.kill();
  }
}
main();
