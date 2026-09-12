const { spawn } = require('child_process');
const fs = require('fs');

async function main() {
  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const chrome = spawn(chromePath, [
    '--headless=new',
    '--disable-gpu',
    '--remote-debugging-port=9226',
    '--window-size=1440,900'
  ]);

  await new Promise(r => setTimeout(r, 1500));

  try {
    const listRes = await fetch('http://127.0.0.1:9226/json/list');
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

    // 1. Verify SW Prefixed Section Elements
    const elementsRes = await send('Runtime.evaluate', {
      expression: `(() => {
        const checks = [
          '.sw-header',
          '.sw-banner',
          '.sw-about',
          '.sw-portfolio',
          '.sw-vibe',
          '.sw-folders',
          '.sw-concepts',
          '.sw-plan',
          '.sw-feedback',
          '.sw-footer',
          '.sw-banner-item-lottie-one svg',
          '.sw-vibe-label-lottie-one svg',
          '.sw-folders-title-lottie svg',
          '.sw-feedback-lottie-right svg',
          '.sw-concepts-product-lottie svg'
        ];
        return checks.map(sel => ({
          selector: sel,
          found: !!document.querySelector(sel)
        }));
      })()`,
      returnByValue: true
    });

    console.log('--- SW Class Checks ---');
    console.table(elementsRes.result.value);

    // 2. Check Lenis smooth scroll
    const lenisRes = await send('Runtime.evaluate', {
      expression: `(() => {
        return {
          hasLenis: !!window.__lenis,
          isSmooth: document.documentElement.classList.contains('lenis-smooth') || document.documentElement.classList.contains('lenis'),
          scrollY: window.scrollY
        };
      })()`,
      returnByValue: true
    });
    console.log('--- Lenis Smooth Scroll ---', lenisRes.result.value);

    // 3. Take Screenshot
    const ssRes = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('scratch/sw_prefixed_verified.png', Buffer.from(ssRes.data, 'base64'));
    console.log('Captured screenshot to scratch/sw_prefixed_verified.png');

    // Scroll to Concepts button
    await send('Runtime.evaluate', {
      expression: `document.querySelector('.sw-concepts-button').scrollIntoView({ behavior: 'instant', block: 'center' })`
    });
    await new Promise(r => setTimeout(r, 800));
    const ssBtnRes = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('scratch/sw_concepts_button_verified.png', Buffer.from(ssBtnRes.data, 'base64'));
    console.log('Captured screenshot to scratch/sw_concepts_button_verified.png');

    // Scroll to Feedback envelope
    await send('Runtime.evaluate', {
      expression: `document.querySelector('.sw-feedback-envelope').scrollIntoView({ behavior: 'instant', block: 'center' })`
    });
    await new Promise(r => setTimeout(r, 800));
    const ssEnvRes = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('scratch/sw_envelope_verified.png', Buffer.from(ssEnvRes.data, 'base64'));
    console.log('Captured screenshot to scratch/sw_envelope_verified.png');

    // 4. Test Contact Modal Click
    await send('Runtime.evaluate', {
      expression: `(() => {
        window.scrollTo(0, 0);
        const btn = document.querySelector('.sw-header-button-design');
        if (btn) btn.click();
      })()`
    });
    await new Promise(r => setTimeout(r, 1000));

    const modalRes = await send('Runtime.evaluate', {
      expression: `(() => {
        return {
          portalFound: !!document.querySelector('.sw-popup-portal'),
          bodyFound: !!document.querySelector('.sw-popup-body'),
          inputFound: !!document.querySelector('.sw-input-field')
        };
      })()`,
      returnByValue: true
    });
    console.log('--- Modal Test ---', modalRes.result.value);

    const ssModalRes = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('scratch/sw_modal_verified.png', Buffer.from(ssModalRes.data, 'base64'));
    console.log('Captured modal screenshot to scratch/sw_modal_verified.png');

    ws.close();
  } catch (err) {
    console.error('Error during test:', err);
  } finally {
    chrome.kill();
  }
}

main();
