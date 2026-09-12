import React, { useState, useEffect } from 'react';
import Lottie from 'lottie-react';
import { arrow, boldLinesOne, lineTwo, lineThree } from '../assets/lottie/animations';

const BANNER_ITEMS = [
  { img: '/image/banner/banner-item1.png' },
  { img: '/image/banner/banner-item2.png', lottie1: arrow, lottie2: lineTwo },
  { img: '/image/banner/banner-item3.png' },
  { img: '/image/banner/banner-item4.png', lottie1: arrow },
  { img: '/image/banner/banner-item5.png', lottie1: arrow, lottie2: boldLinesOne },
  { img: '/image/banner/banner-item6.png', lottie1: lineThree }
];

export default function Banner() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 650);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (!isMobile) return;
    const interval = setInterval(() => {
      setActiveIdx((prev) => (prev + 2 >= BANNER_ITEMS.length ? 0 : prev + 2));
    }, 1500);
    return () => clearInterval(interval);
  }, [isMobile]);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY * 0.5);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const visibleItems = isMobile ? BANNER_ITEMS.slice(activeIdx, activeIdx + 2) : BANNER_ITEMS;

  return (
    <section className="sw-banner">
      <div className="sw-banner-bg" style={{ transform: `translateY(${scrollY * 0.8}px)` }}></div>
      <div className="sw-container">
        <div className="sw-banner-content">
          <h1 className="sw-banner-title">
            Designing <span className="sw-brands">Brands</span> <br />
            that
            <span className="sw-latter">
              {' '}S
              <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 34 34" fill="none">
                <path
                  d="M14.75 1.97363C15.477 0.00892581 18.2564 0.00892512 18.9834 1.97363L20.8877 7.12109C21.869 9.77314 23.9603 11.8644 26.6123 12.8457L31.7598 14.75C33.7245 15.477 33.7245 18.2564 31.7598 18.9834L26.6123 20.8877C23.9603 21.869 21.869 23.9603 20.8877 26.6123L18.9834 31.7598C18.2564 33.7245 15.477 33.7245 14.75 31.7598L12.8457 26.6123C11.8644 23.9603 9.77314 21.869 7.12109 20.8877L1.97363 18.9834C0.00892512 18.2564 0.00892581 15.477 1.97363 14.75L7.12109 12.8457C9.77314 11.8644 11.8644 9.77314 12.8457 7.12109L14.75 1.97363Z"
                  fill="#FFD905"
                  stroke="black"
                />
              </svg>
            </span>
            hine
            <img className="sw-banner-title-bg" src="/image/banner/title-bg.png" alt="title-bg" />
          </h1>

          <img
            className="sw-banner-subtitle"
            src="/image/banner/banner-subtitle.png"
            alt="Landing page design and development for ambitious brands"
          />

          <div className="sw-banner-items">
            {visibleItems.map((item, idx) => (
              <div className="sw-banner-item" key={idx}>
                <img className="sw-banner-item-img" src={item.img} alt={`banner item ${idx + 1}`} />
                {item.lottie1 && <Lottie className="sw-banner-item-lottie-one" animationData={item.lottie1} />}
                {item.lottie2 && <Lottie className="sw-banner-item-lottie-two" animationData={item.lottie2} />}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
