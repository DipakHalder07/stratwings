const { spawn } = require('child_process');
const fs = require('fs');

async function main() {
  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const chrome = spawn(chromePath, [
    '--headless=new',
    '--disable-gpu',
    '--remote-debugging-port=9265'
  ]);

  await new Promise(r => setTimeout(r, 1500));

  try {
    const listRes = await fetch('http://127.0.0.1:9265/json/list');
    const pages = await listRes.json();
    const page = pages.find(p => p.type === 'page') || pages[0];
    const ws = new WebSocket(page.webSocketDebuggerUrl);

    let id = 1;
    const send = (method, params = {}) => new Promise(res => {
      const i = id++;
      const h = (m) => {
        const d = JSON.parse(m.data);
        if (d.id === i) { ws.removeEventListener('message', h); res(d.result); }
      };
      ws.addEventListener('message', h);
      ws.send(JSON.stringify({ id: i, method, params }));
    });

    await new Promise(r => ws.onopen = r);
    await send('Page.enable');
    await send('Emulation.setDeviceMetricsOverride', { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false });
    await send('Page.navigate', { url: 'https://marina-zakharova.netlify.app/' });

    await new Promise(r => setTimeout(r, 3000));

    const res = await send('Runtime.evaluate', {
      expression: `(() => {
        const btns = Array.from(document.querySelectorAll('.portfolio-buttons .portfolio-button')).map(b => ({
          text: b.innerText,
          className: b.className,
          rect: b.getBoundingClientRect().toJSON(),
          img0: b.querySelectorAll('img')[0] ? b.querySelectorAll('img')[0].getBoundingClientRect().toJSON() : null,
          computed: {
            width: window.getComputedStyle(b).width,
            height: window.getComputedStyle(b).height,
            padding: window.getComputedStyle(b).padding,
            fontSize: window.getComputedStyle(b).fontSize,
            fontFamily: window.getComputedStyle(b).fontFamily
          }
        }));
        const title = document.querySelector('.portfolio-title');
        return {
          title: title ? title.getBoundingClientRect().toJSON() : null,
          btns
        };
      })()`,
      returnByValue: true
    });

    console.log(JSON.stringify(res.result.value, null, 2));

    // Scroll to portfolio
    await send('Runtime.evaluate', {
      expression: `(() => {
        const p = document.querySelector('.portfolio');
        if (p) p.scrollIntoView({ behavior: 'instant', block: 'start' });
      })()`
    });
    await new Promise(r => setTimeout(r, 1000));
    const shot = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('scratch/live_portfolio_section.png', Buffer.from(shot.data, 'base64'));
    console.log('Saved live_portfolio_section.png');

    ws.close();
  } catch (err) {
    console.error(err);
  } finally {
    chrome.kill();
  }
}

main();
