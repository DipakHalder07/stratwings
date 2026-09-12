const { spawn } = require('child_process');
const fs = require('fs');

async function main() {
  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const chrome = spawn(chromePath, [
    '--headless=new',
    '--disable-gpu',
    '--remote-debugging-port=9225',
    '--window-size=1440,900'
  ]);

  await new Promise(r => setTimeout(r, 1500));

  try {
    const listRes = await fetch('http://127.0.0.1:9225/json/list');
    const pages = await listRes.json();
    const page = pages.find(p => p.type === 'page') || pages[0];
    const ws = new WebSocket(page.webSocketDebuggerUrl);
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
    await send('Emulation.setDeviceMetricsOverride', { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false });
    await send('Page.navigate', { url: 'http://localhost:3001/' });
    await new Promise(r => setTimeout(r, 3000));

    // Check SVG elements inside each Lottie container
    const evalRes = await send('Runtime.evaluate', {
      expression: `(() => {
        const selectors = [
          '.banner-item-lottie-one svg',
          '.banner-item-lottie-two svg',
          '.vibe-label-lottie-one svg',
          '.vibe-label-lottie-two svg',
          '.folders-title-lottie svg',
          '.folders-item-lottie svg',
          '.feedback-lottie-right svg',
          '.feedback-lottie-left svg',
          '.concepts-product-lottie svg',
          '.lottie-pet-one svg'
        ];
        return selectors.map(s => ({
          selector: s,
          count: document.querySelectorAll(s).length,
          visible: !!document.querySelector(s)
        }));
      })()`,
      returnByValue: true
    });
    console.log('SVG Animation Check:');
    console.table(evalRes.result.value);

    // Capture Banner screenshot
    let shot = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('scratch/lottie_banner.png', Buffer.from(shot.data, 'base64'));

    // Scroll to Vibe & capture
    await send('Runtime.evaluate', {
      expression: `document.querySelector('.vibe').scrollIntoView({ behavior: 'instant', block: 'center' })`
    });
    await new Promise(r => setTimeout(r, 1000));
    shot = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('scratch/lottie_vibe.png', Buffer.from(shot.data, 'base64'));

    // Scroll to Folders & capture
    await send('Runtime.evaluate', {
      expression: `document.querySelector('.folders').scrollIntoView({ behavior: 'instant', block: 'start' })`
    });
    await new Promise(r => setTimeout(r, 1000));
    shot = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('scratch/lottie_folders.png', Buffer.from(shot.data, 'base64'));

    // Scroll to Feedback & capture
    await send('Runtime.evaluate', {
      expression: `document.querySelector('.feedback').scrollIntoView({ behavior: 'instant', block: 'start' })`
    });
    await new Promise(r => setTimeout(r, 1000));
    shot = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('scratch/lottie_feedback.png', Buffer.from(shot.data, 'base64'));

    // Scroll to Portfolio & capture
    await send('Runtime.evaluate', {
      expression: `document.querySelector('.portfolio').scrollIntoView({ behavior: 'instant', block: 'start' })`
    });
    await new Promise(r => setTimeout(r, 1000));
    shot = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('scratch/lottie_portfolio.png', Buffer.from(shot.data, 'base64'));

    console.log('All screenshots captured successfully!');
    ws.close();
  } catch (err) {
    console.error(err);
  } finally {
    chrome.kill();
  }
}
main();
