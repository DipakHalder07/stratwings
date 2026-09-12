import React from 'react';

const NAV_LINKS = [
  { title: 'About the team', href: '#about', bg: '/image/footer/nav/about-bg.png', bgHover: '/image/footer/nav/about-bg-mob.png' },
  { title: 'Our Portfolio', href: '#portfolio', bg: '/image/footer/nav/portfolio-bg.png', bgHover: '/image/footer/nav/portfolio-bg-mob.png' },
  { title: 'Clients', href: '#feedback', bg: '/image/footer/nav/clients-bg.png', bgHover: '/image/footer/nav/clients-bg-mob.png' },
  { title: 'Pricing', href: '#plan', bg: '/image/footer/nav/pricing-bg.png', bgHover: '/image/footer/nav/pricing-bg-mob.png' },
  { title: 'Get in Touch', href: '#footer', bg: '/image/footer/nav/touch-bg.png', bgHover: '/image/footer/nav/touch-bg-mob.png' }
];

export default function Footer({ onOpenContact }) {
  const scrollToTop = () => {
    if (window.__lenis) {
      window.__lenis.scrollTo(0, {
        duration: 1.2,
        easing: (x) => 1 - Math.pow(1 - x, 3)
      });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleNavClick = (e, href) => {
    e.preventDefault();
    if (href === '#footer') {
      onOpenContact();
      return;
    }
    if (window.__lenis) {
      window.__lenis.scrollTo(href, {
        duration: 1.2,
        easing: (x) => 1 - Math.pow(1 - x, 3)
      });
    } else {
      const elem = document.querySelector(href);
      if (elem) elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="footer" id="footer">
      <div className="container">
        <div className="footer-content">
          {/* Left Column: Navigation & Copyright */}
          <div className="footer-left">
            <div className="footer-nav">
              {NAV_LINKS.map((link, idx) => (
                <a
                  key={idx}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="footer-nav-link"
                >
                  <span>{link.title}</span>
                  <img className="footer-nav-link-bg" src={link.bg} alt="bg" />
                  <img className="footer-nav-link-bg-hover" src={link.bgHover} alt="bg-hover" />
                </a>
              ))}
            </div>

            <p className="footer-copyright">
              © 2026 M.Zakharova. All rights reserved. Privacy policy.
            </p>

            <button
              className="button yellow-small footer-back-mobile"
              onClick={scrollToTop}
              title="Back to Top"
            >
              <div className="button-content">↑</div>
            </button>
          </div>

          {/* Center Column: Video & Floating Software Badges */}
          <div className="footer-images">
            <div className="footer-images-top">
              <div className="footer-images-row">
                <img src="/image/footer/item1.png" alt="Figma" />
                <img src="/image/footer/item2.png" alt="Illustrator" />
                <img src="/image/footer/item3.png" alt="After Effects" />
              </div>
              <div className="footer-images-row">
                <img src="/image/footer/item4.png" alt="Photoshop" />
                <img src="/image/footer/item5.png" alt="XD" />
              </div>
            </div>

            {/* Marina Autoplaying Transparent Video */}
            <video
              className="footer-video"
              autoPlay
              loop
              muted
              playsInline
              width="856"
              height="1148"
            >
              <source src="/video/footer.mp4" type='video/mp4; codecs="hvc1"' />
              <source src="/video/footer.webm" type="video/webm" />
              Your browser does not support videos.
            </video>

            {/* Mobile Fallback Cutout */}
            <img
              className="footer-images-marina-mobile"
              src="/image/footer/marina-mobile.png"
              alt="Marina Zakharova"
            />
          </div>

          {/* Right Column: Back to Top & Socials */}
          <div className="footer-right">
            <button
              className="button yellow-small footer-back"
              onClick={scrollToTop}
              title="Back to Top"
            >
              <div className="button-content">↑</div>
            </button>

            <div className="footer-socials">
              <div className="footer-socials-row">
                <button
                  onClick={onOpenContact}
                  className="button pink-small"
                  title="Email"
                >
                  <div className="button-content">✉</div>
                </button>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  className="button pink-small"
                  title="Instagram"
                >
                  <div className="button-content">📷</div>
                </a>
              </div>
              <div className="footer-socials-row">
                <a
                  href="https://t.me"
                  target="_blank"
                  rel="noreferrer"
                  className="button pink-small"
                  title="Telegram"
                >
                  <div className="button-content">✈</div>
                </a>
                <a
                  href="https://whatsapp.com"
                  target="_blank"
                  rel="noreferrer"
                  className="button pink-small"
                  title="WhatsApp"
                >
                  <div className="button-content">💬</div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
