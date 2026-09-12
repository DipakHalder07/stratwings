const { execSync } = require('child_process');
const fs = require('fs');

// We can run a small script in Chrome or use Chrome's print-to-pdf or screenshot
// Or we can write a tiny HTML test or use Chrome remote debugging
const http = require('http');

http.get('http://localhost:3001/image/vibe/vibe-lable.png', (res) => {
  console.log('vibe-lable.png status:', res.statusCode, 'content-type:', res.headers['content-type'], 'size:', res.headers['content-length']);
});

http.get('http://localhost:3001/image/vibe/vibe-flowers.png', (res) => {
  console.log('vibe-flowers.png status:', res.statusCode, 'content-type:', res.headers['content-type'], 'size:', res.headers['content-length']);
});

http.get('http://localhost:3001/assets/bg-second-DOYhwnKY.png', (res) => {
  console.log('bg-second status:', res.statusCode, 'content-type:', res.headers['content-type'], 'size:', res.headers['content-length']);
});
