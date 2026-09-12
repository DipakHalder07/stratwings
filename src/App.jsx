import React, { useState, useEffect } from 'react';
import SmoothScroll from './components/SmoothScroll';
import Header from './components/Header';
import Banner from './components/Banner';
import About from './components/About';
import Portfolio from './components/Portfolio';
import Vibe from './components/Vibe';
import Folders from './components/Folders';
import Concepts from './components/Concepts';
import Plan from './components/Plan';
import Feedback from './components/Feedback';
import Footer from './components/Footer';
import PopupModal from './components/PopupModal';

export default function App() {
  const [isContactOpen, setIsContactOpen] = useState(false);

  useEffect(() => {
    if (window.location.hash) {
      const hash = window.location.hash;
      setTimeout(() => {
        if (window.__lenis) {
          window.__lenis.scrollTo(hash, {
            duration: 1.2,
            easing: (x) => 1 - Math.pow(1 - x, 3)
          });
        } else {
          const elem = document.querySelector(hash);
          if (elem) elem.scrollIntoView({ behavior: 'smooth' });
        }
      }, 400);
    }
  }, []);

  return (
    <>
      <SmoothScroll />
      <Header onOpenContact={() => setIsContactOpen(true)} />

      <main>
        <div className="sw-bg-first">
          <Banner />
          <About />
        </div>

        <div className="sw-bg-second">
          <Portfolio />
          <div className="sw-vibe-wrapper">
            <Vibe />
            <Folders />
          </div>
        </div>

        <Concepts onOpenContact={() => setIsContactOpen(true)} />
        <Plan onOpenContact={() => setIsContactOpen(true)} />
        <Feedback onOpenContact={() => setIsContactOpen(true)} />
      </main>

      <Footer onOpenContact={() => setIsContactOpen(true)} />
      <div id="footer"></div>

      <PopupModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />
    </>
  );
}
