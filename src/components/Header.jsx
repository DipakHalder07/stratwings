import React, { useState, useEffect } from 'react';
import stratwingsLogo from '../assets/lottie/logo/stratwings final logo.png';

export default function Header({ onOpenContact }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    setIsMenuOpen(false);
    if (window.__lenis) {
      window.__lenis.scrollTo(targetId, {
        offset: 0,
        duration: 1.2,
        easing: (x) => 1 - Math.pow(1 - x, 3)
      });
    } else {
      const elem = document.querySelector(targetId);
      if (elem) elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleLogoClick = (e) => {
    e.preventDefault();
    if (window.__lenis) {
      window.__lenis.scrollTo(0, {
        duration: 1.2,
        easing: (x) => 1 - Math.pow(1 - x, 3)
      });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <header className={`sw-header ${isScrolled ? 'sw-header-scrolled' : ''}`}>
      <div className="sw-container">
        <div className="sw-header-content">
          {/* Logo */}
          <a className="sw-header-logo" href="#" onClick={handleLogoClick} title="StratWings Home">
            <img
              src={stratwingsLogo}
              alt="StratWings"
              className="sw-header-logo-img"
              style={{
                height: '42px',
                width: 'auto',
                display: 'block',
                objectFit: 'contain'
              }}
            />
          </a>

          {/* Desktop Nav */}
          <nav className="sw-header-nav">
            <ul className="sw-header-list">
              <li className="sw-header-list-item sw-button">
                <a href="#about" onClick={(e) => handleNavClick(e, '#about')}>
                  About the team <img alt="icon" src="/image/header/header-smile-icon.png" />
                </a>
              </li>
              <li className="sw-header-list-item sw-button">
                <a href="#portfolio" onClick={(e) => handleNavClick(e, '#portfolio')}>
                  Our Portfolio <img alt="icon" src="/image/header/header-fire-icon.png" />
                </a>
              </li>
              <li className="sw-header-list-item sw-button">
                <a href="#feedback" onClick={(e) => handleNavClick(e, '#feedback')}>
                  Clients <img alt="icon" src="/image/header/header-clients-icon.png" />
                </a>
              </li>
              <li className="sw-header-list-item sw-button">
                <a href="#plan" onClick={(e) => handleNavClick(e, '#plan')}>
                  Pricing <img alt="icon" src="/image/header/header-price-icon.png" />
                </a>
              </li>
              <li className="sw-header-list-item sw-button">
                <a href="#footer" onClick={(e) => handleNavClick(e, '#footer')}>
                  Get in Touch <img alt="icon" src="/image/header/header-mailbox-icon.png" />
                </a>
              </li>
            </ul>
          </nav>

          {/* Right Action Button */}
          <div className="sw-header-buttons">
            <button
              className="sw-button sw-yellow sw-header-button-design"
              onClick={onOpenContact}
            >
              <span className="sw-button-content">
                Get in Touch
                <img src="/image/header/header-mailbox-icon.png" alt="icon" />
              </span>
            </button>

            {/* Mobile hamburger toggle */}
            <button
              className={`sw-header-button-menu ${isMenuOpen ? 'sw-close' : ''}`}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle Navigation Menu"
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <div className={`sw-header-mobile-menu ${isMenuOpen ? 'sw-open' : ''}`}>
        <div className="sw-header-mobile-menu-buttons">
          <button className="sw-button sw-menu" onClick={(e) => handleNavClick(e, '#about')}>
            about the studio
          </button>
          <button className="sw-button sw-menu" onClick={(e) => handleNavClick(e, '#portfolio')}>
            our portfolio
          </button>
          <button className="sw-button sw-menu" onClick={(e) => handleNavClick(e, '#feedback')}>
            clients
          </button>
          <button className="sw-button sw-menu" onClick={(e) => handleNavClick(e, '#plan')}>
            pricing
          </button>
          <button className="sw-button sw-menu" onClick={(e) => handleNavClick(e, '#footer')}>
            get in touch
          </button>
        </div>

        <div className="sw-header-mobile-menu-socials">
          <div className="sw-header-mobile-menu-socials-row">
            <button className="sw-button sw-pink-small" onClick={() => { setIsMenuOpen(false); onOpenContact(); }}>
              <div className="sw-button-content">✉️</div>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
