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
      const elem = document.querySelector(window.location.hash);
      if (elem) {
        setTimeout(() => {
          elem.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, []);

  return (
    <>
      <SmoothScroll />
      <Header onOpenContact={() => setIsContactOpen(true)} />

      <main>
        <div className="bg-first">
          <Banner />
          <About />
        </div>

        <div className="bg-second">
          <Portfolio />
          <div className="vibe-wrapper">
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
