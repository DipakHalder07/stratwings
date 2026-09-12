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
    <footer className="sw-footer" id="footer">
      <div className="sw-container">
        <div className="sw-footer-content">
          {/* Left Column: Navigation & Copyright */}
          <div className="sw-footer-left">
            <div className="sw-footer-nav">
              {NAV_LINKS.map((link, idx) => (
                <a
                  key={idx}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="sw-footer-nav-link"
                >
                  <span>{link.title}</span>
                  <img className="sw-footer-nav-link-bg" src={link.bg} alt="bg" />
                  <img className="sw-footer-nav-link-bg-hover" src={link.bgHover} alt="bg-hover" />
                </a>
              ))}
            </div>

            <p className="sw-footer-copyright">
              © 2026 StratWings. All rights reserved. Privacy policy.
            </p>

            <button
              className="sw-button sw-yellow-small sw-footer-back-mobile"
              onClick={scrollToTop}
              title="Back to Top"
            >
              <div className="sw-button-content">↑</div>
            </button>
          </div>

          {/* Center Column: Video & Floating Software Badges */}
          <div className="sw-footer-images">
            <div className="sw-footer-images-top">
              <div className="sw-footer-images-row">
                <img src="/image/footer/item1.png" alt="Figma" />
                <img src="/image/footer/item2.png" alt="Illustrator" />
                <img src="/image/footer/item3.png" alt="After Effects" />
              </div>
              <div className="sw-footer-images-row">
                <img src="/image/footer/item4.png" alt="Photoshop" />
                <img src="/image/footer/item5.png" alt="XD" />
              </div>
            </div>

            {/* Transparent Video */}
            <video
              className="sw-footer-video"
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
              className="sw-footer-images-brand-mobile"
              src="/image/footer/brand-mobile.png"
              alt="Design Studio"
            />
          </div>

          {/* Right Column: Back to Top & Socials */}
          <div className="sw-footer-right">
            <button
              className="sw-button sw-yellow-small sw-footer-back"
              onClick={scrollToTop}
              title="Back to Top"
            >
              <div className="sw-button-content">↑</div>
            </button>

            <div className="sw-footer-socials">
              <div className="sw-footer-socials-row">
                <button
                  onClick={onOpenContact}
                  className="sw-button sw-pink-small"
                  title="Email"
                >
                  <div className="sw-button-content">✉</div>
                </button>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  className="sw-button sw-pink-small"
                  title="Instagram"
                >
                  <div className="sw-button-content">📷</div>
                </a>
              </div>
              <div className="sw-footer-socials-row">
                <a
                  href="https://t.me"
                  target="_blank"
                  rel="noreferrer"
                  className="sw-button sw-pink-small"
                  title="Telegram"
                >
                  <div className="sw-button-content">✈</div>
                </a>
                <a
                  href="https://whatsapp.com"
                  target="_blank"
                  rel="noreferrer"
                  className="sw-button sw-pink-small"
                  title="WhatsApp"
                >
                  <div className="sw-button-content">💬</div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
