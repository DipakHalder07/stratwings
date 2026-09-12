const { spawn } = require('child_process');
const fs = require('fs');

async function main() {
  const base64 = fs.readFileSync('src/assets/lottie/logo/stratwings final logo.png').toString('base64');
  const dataUri = `data:image/png;base64,${base64}`;

  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const chrome = spawn(chromePath, [
    '--headless=new',
    '--disable-gpu',
    '--remote-debugging-port=9233'
  ]);
  await new Promise(r => setTimeout(r, 1500));

  try {
    const listRes = await fetch('http://127.0.0.1:9233/json/list');
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

    const evalRes = await send('Runtime.evaluate', {
      expression: `new Promise((resolve) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          canvas.width = img.width;
          canvas.height = img.height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0);
          const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
          const counts = {};
          for (let i = 0; i < data.length; i += 4) {
            const a = data[i+3];
            if (a > 200) {
              const hex = '#' + [data[i], data[i+1], data[i+2]].map(x => x.toString(16).padStart(2, '0')).join('');
              counts[hex] = (counts[hex] || 0) + 1;
            }
          }
          const sorted = Object.entries(counts).sort((a,b) => b[1] - a[1]);
          resolve(sorted.slice(0, 30));
        };
        img.src = '${dataUri}';
      })`,
      awaitPromise: true,
      returnByValue: true
    });
    console.log('Exact logo pixel colors:');
    console.table(evalRes.result.value);
    ws.close();
  } catch(e) {
    console.error(e);
  } finally {
    chrome.kill();
  }
}
main();
