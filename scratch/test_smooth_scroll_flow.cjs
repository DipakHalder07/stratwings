const { spawn } = require('child_process');

async function main() {
  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const chrome = spawn(chromePath, [
    '--headless=new',
    '--disable-gpu',
    '--remote-debugging-port=9241',
    '--window-size=1440,900'
  ]);
  await new Promise(r => setTimeout(r, 2000));
  try {
    const listRes = await fetch('http://127.0.0.1:9241/json/list');
    const targets = await listRes.json();
    const pageTarget = targets.find(p => p.type === 'page');
    const ws = new WebSocket(pageTarget.webSocketDebuggerUrl);
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

    // Initial scroll position: 0
    let pos = await send('Runtime.evaluate', { expression: 'window.scrollY', returnByValue: true });
    console.log('Initial scrollY:', pos.result.value);

    // Simulate mouseWheel tick
    await send('Input.dispatchMouseEvent', {
      type: 'mouseWheel',
      x: 720,
      y: 450,
      deltaX: 0,
      deltaY: 400
    });

    // Sample across 15 animation frames (every 50ms) to record inertia curve
    const wheelSamples = [];
    for (let i = 0; i < 15; i++) {
      await new Promise(r => setTimeout(r, 50));
      pos = await send('Runtime.evaluate', { expression: 'window.scrollY', returnByValue: true });
      wheelSamples.push(pos.result.value);
    }
    console.log('Wheel inertia scroll progression (50ms intervals):');
    console.log(wheelSamples);

    const isGradual = wheelSamples[0] < wheelSamples[wheelSamples.length - 1];
    const hasInertiaSteps = new Set(wheelSamples).size > 4;
    console.log('Smooth momentum active:', isGradual && hasInertiaSteps);

    // Test clicking navigation link to #about
    await send('Runtime.evaluate', {
      expression: `document.querySelector('a[href="#about"]').click()`
    });
    const navSamples = [];
    for (let i = 0; i < 10; i++) {
      await new Promise(r => setTimeout(r, 100));
      pos = await send('Runtime.evaluate', { expression: 'window.scrollY', returnByValue: true });
      navSamples.push(pos.result.value);
    }
    console.log('Nav click glide progression to #about:');
    console.log(navSamples);

    ws.close();
  } catch (err) {
    console.error(err);
  } finally {
    chrome.kill();
  }
}
main();
