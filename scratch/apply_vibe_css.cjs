const fs = require('fs');

let css = fs.readFileSync('src/index.css', 'utf8');

const vibeCSS = `
/* ============================================================
   BG-SECOND & VIBE SECTION - BEAUTIFUL CLEAN LAYOUT
============================================================ */
.bg-second {
  width: 100%;
  background-size: 100% auto;
  background-position: center top;
  background-repeat: no-repeat;
  background-image: url(/assets/bg-second-DOYhwnKY.png);
  position: relative;
}

.vibe {
  position: relative;
  min-height: 860px;
  padding: 80px 0 0;
  overflow: hidden;
  z-index: 2;
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
  min-height: 700px;
}

.vibe-label {
  position: relative;
  z-index: 5;
  margin: 0 auto;
  text-align: center;
  width: 100%;
  max-width: 480px;
}

.vibe-label-img {
  display: block;
  margin: 0 auto;
  width: 30vw;
  max-width: 440px;
  min-width: 250px;
  height: auto;
  filter: drop-shadow(0 15px 25px rgba(0,0,0,0.07));
  user-select: none;
}

.vibe-label-lottie-one {
  position: absolute;
  top: -12%;
  left: -8%;
  width: 50px;
  height: 50px;
  transform: rotate(15deg);
  pointer-events: none;
  animation: vibe-star-pulse 3s infinite ease-in-out;
}

.vibe-label-lottie-two {
  position: absolute;
  bottom: -15%;
  right: -6%;
  width: 56px;
  height: 56px;
  transform: rotate(-25deg);
  pointer-events: none;
  animation: vibe-star-pulse 3s infinite ease-in-out 1.5s;
}

@keyframes vibe-star-pulse {
  0%, 100% { transform: scale(1) rotate(0deg); }
  50% { transform: scale(1.18) rotate(15deg); }
}

.vibe-items {
  position: absolute;
  top: 0;
  left: 0;
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
  transition: transform 0.25s cubic-bezier(0.2, 0.9, 0.4, 1.1), filter 0.25s ease;
}

.vibe-item:hover {
  transform: scale(1.08) !important;
  z-index: 10 !important;
}

.vibe-item-main,
.vibe-item-hover {
  display: block;
  width: 100%;
  height: auto;
  transition: opacity 0.22s ease-in-out;
  filter: drop-shadow(0 12px 20px rgba(0,0,0,0.12));
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

/* Individual Item Coordinates - Balanced around the central label */
.vibe-item-1 {
  left: 9%;
  top: 14%;
  width: 14vw;
  max-width: 175px;
  transform: rotate(24deg);
  z-index: 3;
}
.vibe-item-2 {
  left: 14%;
  top: 38%;
  width: 12vw;
  max-width: 155px;
  transform: rotate(-12deg);
  z-index: 4;
}
.vibe-item-3 {
  left: 23%;
  top: 56%;
  width: 13vw;
  max-width: 165px;
  transform: rotate(18deg);
  z-index: 5;
}
.vibe-item-4 {
  left: 6%;
  top: 52%;
  width: 18vw;
  max-width: 235px;
  transform: rotate(-15deg);
  z-index: 3;
}
.vibe-item-5 {
  left: 31%;
  top: 45%;
  width: 7.5vw;
  max-width: 95px;
  transform: rotate(38deg);
  z-index: 6;
}
.vibe-item-6 {
  left: 64%;
  top: 45%;
  width: 11vw;
  max-width: 145px;
  transform: rotate(-18deg);
  z-index: 6;
}
.vibe-item-7 {
  left: 72%;
  top: 54%;
  width: 9vw;
  max-width: 125px;
  transform: rotate(30deg);
  z-index: 5;
}
.vibe-item-8 {
  left: 77%;
  top: 38%;
  width: 10vw;
  max-width: 135px;
  transform: rotate(-24deg);
  z-index: 4;
}
.vibe-item-9 {
  left: 81%;
  top: 15%;
  width: 11vw;
  max-width: 155px;
  transform: rotate(26deg);
  z-index: 5;
}
.vibe-item-10 {
  left: 85%;
  top: 49%;
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
    width: 38vw;
  }
  .vibe-item-1 { left: 4%; top: 12%; }
  .vibe-item-4 { left: 2%; top: 48%; }
  .vibe-item-9 { left: 78%; top: 12%; }
  .vibe-item-10 { left: 80%; top: 46%; }
}

@media screen and (max-width: 768px) {
  .vibe {
    min-height: 650px;
    padding: 60px 0 0;
  }
  .vibe-label-img {
    width: 250px;
  }
  .vibe-flowers {
    width: 140%;
    left: 50%;
    transform: translateX(-50%);
    max-height: 320px;
  }
  .vibe-item-1 { left: 4%; top: 18%; max-width: 110px; }
  .vibe-item-2 { left: 8%; top: 40%; max-width: 95px; }
  .vibe-item-3 { left: 16%; top: 58%; max-width: 105px; }
  .vibe-item-4 { left: 1%; top: 55%; max-width: 140px; }
  .vibe-item-5 { left: 24%; top: 46%; max-width: 65px; }
  .vibe-item-6 { left: 66%; top: 46%; max-width: 90px; }
  .vibe-item-7 { left: 74%; top: 54%; max-width: 75px; }
  .vibe-item-8 { left: 78%; top: 38%; max-width: 85px; }
  .vibe-item-9 { left: 75%; top: 18%; max-width: 95px; }
  .vibe-item-10 { left: 82%; top: 50%; max-width: 90px; }
}
`;

// Append to index.css
css = css + '\n' + vibeCSS;
fs.writeFileSync('src/index.css', css, 'utf8');
console.log('Appended vibeCSS to index.css successfully');
