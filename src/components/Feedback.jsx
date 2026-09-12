import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Lottie from 'lottie-react';
import { boldLinesOne, lineTwo } from '../assets/lottie/animations';

const LETTERS = [
  '/image/feedback/letters/letter1.png',
  '/image/feedback/letters/letter2.png',
  '/image/feedback/letters/letter3.png',
  '/image/feedback/letters/letter4.png',
  '/image/feedback/letters/letter5.png',
  '/image/feedback/letters/letter6.png',
  '/image/feedback/letters/letter7.png'
];

export default function Feedback({ onOpenContact }) {
  const envelopeRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: envelopeRef,
    offset: ['start end', 'end start']
  });

  // Authentic transforms from original live production code
  const rotateX = useTransform(scrollYProgress, [0.2, 0.3], [0, -180]);
  const rotateZFlap = useTransform(scrollYProgress, [0.2, 0.3], [0, 0.4]);
  const translateYFlap = useTransform(scrollYProgress, [0.2, 0.3], [-8, 4]);
  const zIndexFlap = useTransform(scrollYProgress, (v) => (v > 0.26 ? 1 : 4));
  const rotateZEnvelope = useTransform(scrollYProgress, [0.15, 0.3], [0, -15]);
  const translateYLetter = useTransform(scrollYProgress, [0.2, 0.5], ['0%', '-10%']);
  const scaleLetter = useTransform(scrollYProgress, [0.2, 0.5], [0.4, 1]);
  const flowerParallax = useTransform(scrollYProgress, [0, 1], ['-30%', '0%']);

  useEffect(() => {
    const letters = document.querySelectorAll('.feedback-letter');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, idx) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add('feedback-letter-is-visible');
            }, idx * 200);
          }
        });
      },
      { threshold: 0.8 }
    );
    letters.forEach((l) => observer.observe(l));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="feedback">
      <div className="container">
        <div className="feedback-content">
          {/* Scroll-Triggered Envelope */}
          <div className="feedback-envelope-wrapper" ref={envelopeRef}>
            <motion.div
              className="feedback-envelope"
              style={{ rotateZ: rotateZEnvelope }}
            >
              {/* Starry badges */}
              <Lottie className="feedback-lottie-right" animationData={boldLinesOne} />
              <Lottie className="feedback-lottie-left" animationData={lineTwo} />

              <img className="feedback-envelope-main" src="/image/feedback/envelope-main.png" alt="envelope" />
              <img className="feedback-envelope-front" src="/image/feedback/envelope-front.png" alt="envelope" />
              <img className="feedback-envelope-down" src="/image/feedback/envelope-down.png" alt="envelope" />
              
              {/* Flap that opens on scroll and tucks behind */}
              <motion.img
                className="feedback-envelope-had"
                src="/image/feedback/envelope-had.png"
                alt="envelope flap"
                style={{
                  rotateX,
                  rotateZ: rotateZFlap,
                  translateY: translateYFlap,
                  zIndex: zIndexFlap
                }}
              />

              {/* Letter rising out of envelope */}
              <motion.div
                className="feedback-envelope-letter"
                style={{
                  scale: scaleLetter,
                  translateY: translateYLetter
                }}
              >
                <img src="/image/feedback/envelope-letter-bg.png" alt="letter-bg" />
                <button
                  onClick={onOpenContact}
                  className="button yellow-big feedback-envelope-letter-button"
                >
                  <div className="button-content">Start your project</div>
                </button>
              </motion.div>
            </motion.div>
          </div>

          {/* Section Title */}
          <h1 className="feedback-title" id="feedback">
            Love <span className="brands">Letters</span> from
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;our client<span className="latter">S</span>
            <img className="feedback-title-bg" src="/image/feedback/feedback-title-bg.png" alt="title-bg" />
          </h1>

          {/* Review Letters Grid */}
          <div className="feedback-row">
            {LETTERS.map((letterImg, idx) => (
              <div key={idx} className="feedback-letter-wrap">
                <img
                  className="feedback-letter"
                  src={letterImg}
                  alt={`client review ${idx + 1}`}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Flowers parallax layers */}
      <motion.img
        src="/image/feedback/flowers/flowers-all.png"
        className="feedback-flowers all"
        style={{ y: flowerParallax }}
        alt="flowers"
      />
      <img
        src="/image/feedback/flowers/flowers-down.png"
        className="feedback-flowers down"
        alt="flowers"
      />
    </section>
  );
}
