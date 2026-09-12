import React, { useState, useEffect } from 'react';

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
          <a className="sw-header-logo" href="#" onClick={handleLogoClick}>
            <svg xmlns="http://www.w3.org/2000/svg" width="31" height="42" viewBox="0 0 31 42" fill="none">
              <path d="M2.79007 20.0985L2.62891 38.9009L9.3665 39.0079L9.35387 40.6158H17.6682L17.6511 38.8727L24.1837 38.7398L24.4741 20.2968L2.79007 20.0985Z" fill="#FFD905" stroke="black" strokeMiterlimit="10"></path>
              <path d="M0.600922 16.4371H6.54533L6.55276 24.7863H4.8082L2.34028 24.767L0.505859 24.7485L0.600922 16.4371Z" fill="#FFD905" stroke="black" strokeMiterlimit="10"></path>
              <path d="M14.0772 28.3875L7.80078 3.93847L10.19 3.30942L9.76591 1.4453L12.7804 0.615723L13.3063 2.58308L15.7341 1.99191L21.8018 26.2545L14.0772 28.3875Z" fill="#FFD905" stroke="black" strokeMiterlimit="10"></path>
              <path d="M5.58354 14.1875H12.509V25.2668H10.4273L7.5197 25.2408L5.49219 25.2207L5.58354 14.1875Z" fill="#FFD905" stroke="black" strokeMiterlimit="10"></path>
              <path d="M15.6191 26.9512L21.5895 2.92106L23.9787 3.53154L24.4823 1.72534L27.5124 2.46357L27.0505 4.40716L29.4553 5.06814L23.3891 28.8383L15.6191 26.9512Z" fill="#FFD905" stroke="black" strokeMiterlimit="10"></path>
              <path d="M24.2309 35.9251L24.398 25.2899L13.1635 22.2843L9.77539 23.0782V29.6658L14.9006 29.7512L14.9274 27.9554L18.1097 27.9138L24.3438 35.9251" fill="#FFD905"></path>
              <path d="M24.2309 35.9251L24.398 25.2899L13.1635 22.2843L9.77539 23.0782V29.6658L14.9006 29.7512L14.9274 27.9554L18.1097 27.9138L24.3438 35.9251" stroke="black" strokeMiterlimit="10"></path>
            </svg>
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
