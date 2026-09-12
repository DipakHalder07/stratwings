const fs = require('fs');

let css = fs.readFileSync('src/index.css', 'utf8');

const additionalFixesCSS = `
/* ============================================================
   CONCEPTS, PLAN, FEEDBACK & FOOTER - PERFECTION FIXES
============================================================ */
.concepts {
  position: relative;
  width: 100%;
  min-height: 160vh;
  background-image: url(/assets/bg-first-Cpqbn9oc.png);
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center top;
  overflow: visible;
  padding: 100px 0 120px;
  z-index: 2;
}

.concepts-content {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  width: 100%;
  min-height: 160vh;
  gap: 40px;
}

.concepts-titles {
  padding: 80px 0 40px;
  max-width: 44%;
  width: 100%;
  position: sticky;
  top: 60px;
  height: calc(100vh - 60px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  z-index: 3;
}

.concepts-title {
  margin-bottom: 24px;
}

.concepts-subtitle {
  margin-bottom: 40px;
}

.concepts-products-sticky {
  width: 54%;
  min-height: 160vh;
  position: relative;
}

.concepts-products {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  align-items: flex-start;
}

.concepts-products-column {
  display: flex;
  flex-direction: column;
  gap: 28px;
}

.concepts-products-column img,
.concepts-product img {
  width: 100%;
  max-height: 220px;
  object-fit: contain;
  object-position: center;
  filter: drop-shadow(0 15px 25px rgba(0,0,0,0.12));
}

.concepts-products-inner:nth-child(1) {
  padding-top: 40px;
}

.concepts-products-inner:nth-child(2) {
  padding-top: 0px;
}

.concepts-products-inner:nth-child(3) {
  padding-top: 60px;
}

/* Plan spacing and running line */
.plan {
  position: relative;
  width: 100%;
  padding: 120px 0 0;
  overflow: visible;
  z-index: 2;
}

.running-line {
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  position: relative;
  padding: 14px 0;
  margin-top: 90px;
  margin-bottom: 0;
  z-index: 5;
}

/* Feedback Section: Generous padding, no overlap with Plan, clean envelope */
.feedback {
  position: relative;
  width: 100%;
  padding: 140px 0 300px;
  background-image: url(/assets/bg-first-Cpqbn9oc.png);
  background-repeat: no-repeat;
  background-position: center top;
  background-size: cover;
  z-index: 3;
  overflow: hidden;
}

.feedback .container {
  position: relative;
  z-index: 4;
}

.feedback-envelope-wrapper {
  width: 100%;
  position: relative;
  margin: 0 auto 130px;
  max-width: 620px;
  display: flex;
  justify-content: center;
}

.feedback-envelope {
  position: relative;
  width: 100%;
  max-width: 520px;
  margin: 0 auto;
  overflow: visible;
  perspective: 1200px;
  transform-origin: center center;
}

.feedback-envelope-main {
  position: relative;
  z-index: 1;
  width: 100%;
  display: block;
}

.feedback-envelope-front {
  position: absolute;
  z-index: 2;
  width: 104%;
  bottom: -1.5%;
  left: -2%;
  pointer-events: none;
}

.feedback-envelope-down {
  position: absolute;
  bottom: -2%;
  left: -2.2%;
  z-index: 3;
  width: 104%;
  pointer-events: none;
}

.feedback-envelope-had {
  width: 100%;
  position: absolute;
  top: 2px;
  left: 0;
  z-index: 4;
  transform-origin: top center;
  pointer-events: none;
}

.feedback-envelope-letter {
  position: absolute;
  width: 96%;
  left: 2%;
  bottom: 4%;
  z-index: 1;
  transform-origin: center bottom;
  filter: drop-shadow(0 15px 30px rgba(0,0,0,0.15));
}

.feedback-envelope-letter img {
  width: 100%;
  display: block;
}

.feedback-envelope-letter-button {
  position: absolute !important;
  bottom: 18%;
  left: 50%;
  transform: translate(-50%) scale(0.72) rotate(-8deg);
  z-index: 5;
}

.feedback-lottie-left {
  position: absolute;
  top: -18%;
  left: -12%;
  width: 58px;
  height: 58px;
  transform: rotate(25deg);
  z-index: 5;
  pointer-events: none;
  animation: vibe-star-pulse 3s infinite ease-in-out;
}

.feedback-lottie-right {
  position: absolute;
  top: -16%;
  right: -10%;
  width: 52px;
  height: 52px;
  transform: rotate(-15deg);
  z-index: 5;
  pointer-events: none;
  animation: vibe-star-pulse 3s infinite ease-in-out 1.2s;
}

.feedback-title {
  margin: 70px auto 50px;
  position: relative;
  z-index: 4;
}

.feedback-flowers.all {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: auto;
  max-height: 480px;
  object-fit: cover;
  object-position: bottom center;
  z-index: 1;
  pointer-events: none;
}

.feedback-flowers.down {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: auto;
  max-height: 380px;
  object-fit: cover;
  object-position: bottom center;
  z-index: 2;
  pointer-events: none;
}

/* Footer Section: Authentic full styling */
.footer {
  background: #ffd905;
  padding: 100px 0 40px;
  width: 100%;
  position: relative;
  z-index: 4;
  overflow: hidden;
}

.footer .container {
  position: relative;
  z-index: 3;
}

.footer-content {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  position: relative;
  min-height: 520px;
}

.footer-left {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 480px;
  position: relative;
  z-index: 3;
}

.footer-nav {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 14px;
}

.footer-nav-link {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 6px 18px;
  height: 46px;
  text-decoration: none;
  cursor: pointer;
  transition: transform 0.2s ease;
}

.footer-nav-link:hover {
  transform: scale(1.04);
}

.footer-nav-link span {
  color: #ff64d5;
  font-size: 22px;
  font-family: 'Bebas Neue', sans-serif;
  letter-spacing: 0.5px;
  position: relative;
  z-index: 2;
  white-space: nowrap;
}

.footer-nav-link:hover span {
  color: #fff;
}

.footer-nav-link-bg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
}

.footer-nav-link-bg-hover {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  opacity: 0;
  transition: opacity 0.2s ease;
}

.footer-nav-link:hover .footer-nav-link-bg {
  opacity: 0;
}

.footer-nav-link:hover .footer-nav-link-bg-hover {
  opacity: 1;
}

.footer-copyright {
  color: #000;
  font-size: 14px;
  font-weight: 500;
  margin-top: 40px;
}

.footer-images {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  z-index: 2;
}

.footer-images-top {
  display: flex;
  flex-direction: column;
  gap: 12px;
  position: relative;
  z-index: 3;
  margin-bottom: 20px;
}

.footer-images-row {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 14px;
}

.footer-images-row img {
  max-width: 90px;
  height: auto;
  filter: drop-shadow(0 10px 15px rgba(0,0,0,0.12));
  animation: subtle-sway 3s ease-in-out infinite;
}

.footer-images-row img:nth-child(2) { animation-delay: 0.8s; }
.footer-images-row img:nth-child(3) { animation-delay: 1.6s; }
.footer-images-row:nth-child(2) img:nth-child(1) { animation-delay: 1.2s; }
.footer-images-row:nth-child(2) img:nth-child(2) { animation-delay: 2.2s; }

.footer-video {
  max-width: 360px;
  height: auto;
  display: block;
  margin-top: -15px;
  z-index: 2;
  border-radius: 16px;
}

.footer-images-marina-mobile {
  display: none;
}

.footer-right {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
  min-height: 480px;
  position: relative;
  z-index: 3;
}

.footer-socials {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.footer-socials-row {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

.footer-socials .button {
  font-size: 20px;
  padding: 8px 12px;
  min-width: 44px;
}

/* Mobile adjustments */
@media screen and (max-width: 768px) {
  .concepts-content {
    flex-direction: column;
    min-height: auto;
  }
  .concepts-titles {
    position: relative;
    top: auto;
    height: auto;
    max-width: 100%;
    padding: 40px 0;
    text-align: center;
  }
  .concepts-products-sticky {
    width: 100%;
    min-height: auto;
  }
  .concepts-products {
    grid-template-columns: 1fr;
  }
  .footer-content {
    flex-direction: column;
    align-items: center;
    gap: 40px;
  }
  .footer-left {
    min-height: auto;
    align-items: center;
  }
  .footer-right {
    min-height: auto;
    align-items: center;
  }
  .footer-video {
    display: none;
  }
  .footer-images-marina-mobile {
    display: block;
    max-width: 280px;
    margin-top: 20px;
  }
}
`;

css = css + '\n' + additionalFixesCSS;
fs.writeFileSync('src/index.css', css, 'utf8');
console.log('Appended all perfection fixes CSS successfully');
