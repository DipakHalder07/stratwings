const fs = require('fs');
const zlib = require('zlib');

// Check vibe-flowers.png at x = width / 2 = 1440
// vibe-flowers is 2880 x 1128
// Let's check if the image has a seam at x = 1440
console.log('Checking vibe-flowers.png width and height:');
const buf = fs.readFileSync('public/image/vibe/vibe-flowers.png');
console.log('Size:', buf.length);
