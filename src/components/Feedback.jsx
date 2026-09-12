import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

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

  const flapAngle = useTransform(scrollYProgress, [0.2, 0.45], [0, -180]);
  const letterY = useTransform(scrollYProgress, [0.25, 0.55], ['0%', '-16%']);
  const letterScale = useTransform(scrollYProgress, [0.25, 0.55], [0.88, 1]);
  const envelopeRotate = useTransform(scrollYProgress, [0.15, 0.5], [0, -6]);

  const smoothFlap = useSpring(flapAngle, { stiffness: 75, damping: 20 });
  const smoothLetterY = useSpring(letterY, { stiffness: 75, damping: 20 });
  const smoothEnvelopeRotate = useSpring(envelopeRotate, { stiffness: 75, damping: 20 });

  useEffect(() => {
    const letters = document.querySelectorAll('.feedback-letter');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, idx) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add('feedback-letter-is-visible');
            }, idx * 100);
          }
        });
      },
      { threshold: 0.15 }
    );
    letters.forEach((l) => observer.observe(l));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="feedback" id="feedback">
      <div className="container">
        <div className="feedback-content">
          {/* Animated Scroll-Triggered Envelope */}
          <div className="feedback-envelope-wrapper" ref={envelopeRef}>
            <motion.div
              className="feedback-envelope"
              style={{ rotateZ: smoothEnvelopeRotate }}
            >
              {/* Lottie stars around envelope */}
              <svg className="feedback-lottie-left" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14.75 1.97363C15.477 0.00892581 18.2564 0.00892512 18.9834 1.97363L20.8877 7.12109C21.869 9.77314 23.9603 11.8644 26.6123 12.8457L31.7598 14.75C33.7245 15.477 33.7245 18.2564 31.7598 18.9834L26.6123 20.8877C23.9603 21.869 21.869 23.9603 20.8877 26.6123L18.9834 31.7598C18.2564 33.7245 15.477 33.7245 14.75 31.7598L12.8457 26.6123C11.8644 23.9603 9.77314 21.869 7.12109 20.8877L1.97363 18.9834C0.00892512 18.2564 0.00892581 15.477 1.97363 14.75L7.12109 12.8457C9.77314 11.8644 11.8644 9.77314 12.8457 7.12109L14.75 1.97363Z" fill="#ff64d5"/>
              </svg>
              <svg className="feedback-lottie-right" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14.75 1.97363C15.477 0.00892581 18.2564 0.00892512 18.9834 1.97363L20.8877 7.12109C21.869 9.77314 23.9603 11.8644 26.6123 12.8457L31.7598 14.75C33.7245 15.477 33.7245 18.2564 31.7598 18.9834L26.6123 20.8877C23.9603 21.869 21.869 23.9603 20.8877 26.6123L18.9834 31.7598C18.2564 33.7245 15.477 33.7245 14.75 31.7598L12.8457 26.6123C11.8644 23.9603 9.77314 21.869 7.12109 20.8877L1.97363 18.9834C0.00892512 18.2564 0.00892581 15.477 1.97363 14.75L7.12109 12.8457C9.77314 11.8644 11.8644 9.77314 12.8457 7.12109L14.75 1.97363Z" fill="#ffd905"/>
              </svg>

              <img className="feedback-envelope-main" src="/image/feedback/envelope-main.png" alt="envelope back" />
              <img className="feedback-envelope-front" src="/image/feedback/envelope-front.png" alt="envelope front" />
              <img className="feedback-envelope-down" src="/image/feedback/envelope-down.png" alt="envelope bottom" />
              
              {/* Flap that opens on scroll */}
              <motion.img
                className="feedback-envelope-had"
                src="/image/feedback/envelope-had.png"
                alt="envelope flap"
                style={{
                  rotateX: smoothFlap,
                  transformOrigin: 'top center'
                }}
              />

              {/* Letter rising out of envelope */}
              <motion.div
                className="feedback-envelope-letter"
                style={{
                  scale: letterScale,
                  y: smoothLetterY
                }}
              >
                <img src="/image/feedback/envelope-letter-bg.png" alt="letter" />
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
          <h2 className="feedback-title">
            Love <span className="brands">Letters</span> from
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;our client<span className="latter">S</span>
            <img className="feedback-title-bg" src="/image/feedback/feedback-title-bg.png" alt="title-bg" />
          </h2>

          {/* Staggered Letter Reviews */}
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

      {/* Background Flowers */}
      <img className="feedback-flowers all" src="/image/feedback/flowers/flowers-all.png" alt="flowers" />
      <img className="feedback-flowers down" src="/image/feedback/flowers/flowers-down.png" alt="flowers-small" />
    </section>
  );
}
