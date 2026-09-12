import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

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
              <svg className="feedback-lottie-right" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14.75 1.97363C15.477 0.00892581 18.2564 0.00892512 18.9834 1.97363L20.8877 7.12109C21.869 9.77314 23.9603 11.8644 26.6123 12.8457L31.7598 14.75C33.7245 15.477 33.7245 18.2564 31.7598 18.9834L26.6123 20.8877C23.9603 21.869 21.869 23.9603 20.8877 26.6123L18.9834 31.7598C18.2564 33.7245 15.477 33.7245 14.75 31.7598L12.8457 26.6123C11.8644 23.9603 9.77314 21.869 7.12109 20.8877L1.97363 18.9834C0.00892512 18.2564 0.00892581 15.477 1.97363 14.75L7.12109 12.8457C9.77314 11.8644 11.8644 9.77314 12.8457 7.12109L14.75 1.97363Z" fill="#ffd905"/>
              </svg>
              <svg className="feedback-lottie-left" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14.75 1.97363C15.477 0.00892581 18.2564 0.00892512 18.9834 1.97363L20.8877 7.12109C21.869 9.77314 23.9603 11.8644 26.6123 12.8457L31.7598 14.75C33.7245 15.477 33.7245 18.2564 31.7598 18.9834L26.6123 20.8877C23.9603 21.869 21.869 23.9603 20.8877 26.6123L18.9834 31.7598C18.2564 33.7245 15.477 33.7245 14.75 31.7598L12.8457 26.6123C11.8644 23.9603 9.77314 21.869 7.12109 20.8877L1.97363 18.9834C0.00892512 18.2564 0.00892581 15.477 1.97363 14.75L7.12109 12.8457C9.77314 11.8644 11.8644 9.77314 12.8457 7.12109L14.75 1.97363Z" fill="#ff64d5"/>
              </svg>

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
