const fs = require('fs');

let css = fs.readFileSync('src/index.css', 'utf8');

// Replace the previous vibeCSS block in index.css
const startMark = '/* ============================================================\n   BG-SECOND & VIBE SECTION';
const idx = css.indexOf(startMark);
if (idx !== -1) {
  css = css.substring(0, idx);
}

const refinedVibeCSS = `
/* ============================================================
   BG-SECOND & VIBE SECTION - MASTERPIECE QUALITY
============================================================ */
.bg-second {
  width: 100%;
  background-size: cover;
  background-position: center top;
  background-repeat: no-repeat;
  background-image: url(/assets/bg-second-DOYhwnKY.png);
  position: relative;
  overflow: hidden;
}

.vibe {
  position: relative;
  min-height: 860px;
  height: 92vh;
  max-height: 1000px;
  padding: 80px 0 0;
  overflow: hidden;
  z-index: 2;
  display: flex;
  flex-direction: column;
}

.vibe-flowers {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: auto;
  max-height: 480px;
  object-fit: cover;
  object-position: bottom center;
  z-index: 2;
  pointer-events: none;
}

.vibe-container {
  position: relative;
  z-index: 4;
  height: 100%;
  width: 100%;
  max-width: 1412px;
  margin: 0 auto;
}

.vibe-label {
  position: relative;
  z-index: 5;
  margin: 0 auto;
  text-align: center;
  width: 100%;
  max-width: 460px;
}

.vibe-label-img {
  display: block;
  margin: 0 auto;
  width: 28vw;
  max-width: 420px;
  min-width: 240px;
  height: auto;
  filter: drop-shadow(0 15px 30px rgba(0,0,0,0.08));
  user-select: none;
}

.vibe-label-lottie-one {
  position: absolute;
  top: -15%;
  left: -10%;
  width: 52px;
  height: 52px;
  transform: rotate(15deg);
  pointer-events: none;
  animation: vibe-star-pulse 3s infinite ease-in-out;
}

.vibe-label-lottie-two {
  position: absolute;
  bottom: -18%;
  right: -8%;
  width: 58px;
  height: 58px;
  transform: rotate(-25deg);
  pointer-events: none;
  animation: vibe-star-pulse 3s infinite ease-in-out 1.5s;
}

@keyframes vibe-star-pulse {
  0%, 100% { transform: scale(1) rotate(0deg); }
  50% { transform: scale(1.15) rotate(15deg); }
}

.vibe-items {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 3;
}

.vibe-item {
  position: absolute;
  pointer-events: auto;
  cursor: pointer;
  display: block;
  transition: transform 0.28s cubic-bezier(0.2, 0.9, 0.4, 1.1), filter 0.28s ease;
}

.vibe-item:hover {
  transform: scale(1.1) !important;
  z-index: 10 !important;
  filter: drop-shadow(0 20px 30px rgba(0,0,0,0.18));
}

.vibe-item-main,
.vibe-item-hover {
  display: block;
  width: 100%;
  height: auto;
  transition: opacity 0.22s ease-in-out;
  filter: drop-shadow(0 12px 20px rgba(0,0,0,0.11));
  user-select: none;
}

.vibe-item-hover {
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0;
}

.vibe-item:hover .vibe-item-main,
.vibe-item.is-active .vibe-item-main {
  opacity: 0;
}

.vibe-item:hover .vibe-item-hover,
.vibe-item.is-active .vibe-item-hover {
  opacity: 1;
}

/* Individual Item Coordinates - Harmonious framing around the center label */
.vibe-item-1 {
  left: 6%;
  top: 10%;
  width: 13vw;
  max-width: 170px;
  transform: rotate(24deg);
  z-index: 3;
}
.vibe-item-2 {
  left: 9%;
  top: 36%;
  width: 12vw;
  max-width: 155px;
  transform: rotate(-12deg);
  z-index: 4;
}
.vibe-item-3 {
  left: 19%;
  top: 52%;
  width: 13vw;
  max-width: 165px;
  transform: rotate(20deg);
  z-index: 5;
}
.vibe-item-4 {
  left: 2%;
  top: 56%;
  width: 17vw;
  max-width: 230px;
  transform: rotate(-15deg);
  z-index: 3;
}
.vibe-item-5 {
  left: 30%;
  top: 45%;
  width: 7.5vw;
  max-width: 95px;
  transform: rotate(38deg);
  z-index: 6;
}
.vibe-item-6 {
  left: 62%;
  top: 45%;
  width: 11vw;
  max-width: 145px;
  transform: rotate(-18deg);
  z-index: 6;
}
.vibe-item-7 {
  left: 72%;
  top: 55%;
  width: 9vw;
  max-width: 125px;
  transform: rotate(28deg);
  z-index: 5;
}
.vibe-item-8 {
  left: 79%;
  top: 36%;
  width: 10vw;
  max-width: 135px;
  transform: rotate(-24deg);
  z-index: 4;
}
.vibe-item-9 {
  left: 81%;
  top: 10%;
  width: 11vw;
  max-width: 155px;
  transform: rotate(26deg);
  z-index: 5;
}
.vibe-item-10 {
  left: 86%;
  top: 50%;
  width: 11vw;
  max-width: 145px;
  transform: rotate(-32deg);
  z-index: 3;
}

/* Tablet & Mobile Breakpoints */
@media screen and (max-width: 1024px) {
  .vibe {
    min-height: 750px;
  }
  .vibe-label-img {
    width: 36vw;
  }
  .vibe-item-1 { left: 3%; top: 8%; }
  .vibe-item-4 { left: 0%; top: 52%; }
  .vibe-item-9 { left: 77%; top: 8%; }
  .vibe-item-10 { left: 81%; top: 48%; }
}

@media screen and (max-width: 768px) {
  .vibe {
    min-height: 650px;
    padding: 60px 0 0;
  }
  .vibe-label-img {
    width: 240px;
  }
  .vibe-flowers {
    width: 150%;
    left: 50%;
    transform: translateX(-50%);
    max-height: 320px;
  }
  .vibe-item-1 { left: 2%; top: 12%; max-width: 100px; }
  .vibe-item-2 { left: 6%; top: 38%; max-width: 90px; }
  .vibe-item-3 { left: 14%; top: 58%; max-width: 95px; }
  .vibe-item-4 { left: 0%; top: 55%; max-width: 130px; }
  .vibe-item-5 { left: 22%; top: 45%; max-width: 60px; }
  .vibe-item-6 { left: 66%; top: 45%; max-width: 85px; }
  .vibe-item-7 { left: 74%; top: 54%; max-width: 70px; }
  .vibe-item-8 { left: 78%; top: 35%; max-width: 80px; }
  .vibe-item-9 { left: 74%; top: 12%; max-width: 90px; }
  .vibe-item-10 { left: 82%; top: 48%; max-width: 85px; }
}
`;

css = css + '\n' + refinedVibeCSS;
fs.writeFileSync('src/index.css', css, 'utf8');
console.log('Updated index.css successfully');
