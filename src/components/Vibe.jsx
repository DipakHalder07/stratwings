import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const VIBE_ITEMS = Array.from({ length: 10 }, (_, i) => ({
  item: `/image/vibe/items/item${i + 1}.png`,
  itemHover: `/image/vibe/items/item-hover${i + 1}.png`
}));

export default function Vibe() {
  const [activeItem, setActiveItem] = useState(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveItem((prev) => {
        let next;
        do {
          next = Math.floor(Math.random() * VIBE_ITEMS.length);
        } while (next === prev);
        return next;
      });
    }, 1500);
    return () => clearInterval(timer);
  }, []);

  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const x = (e.clientX - window.innerWidth / 2) / 40;
    const y = (e.clientY - window.innerHeight / 2) / 40;
    setMouseOffset({ x, y });
  };

  return (
    <section className="vibe" onMouseMove={handleMouseMove}>
      <img
        className="vibe-flowers"
        src="/image/vibe/vibe-flowers.png"
        alt="vibe-flowers"
      />

      <div className="container">
        <div className="vibe-label">
          <svg className="vibe-label-lottie-one" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14.75 1.97363C15.477 0.00892581 18.2564 0.00892512 18.9834 1.97363L20.8877 7.12109C21.869 9.77314 23.9603 11.8644 26.6123 12.8457L31.7598 14.75C33.7245 15.477 33.7245 18.2564 31.7598 18.9834L26.6123 20.8877C23.9603 21.869 21.869 23.9603 20.8877 26.6123L18.9834 31.7598C18.2564 33.7245 15.477 33.7245 14.75 31.7598L12.8457 26.6123C11.8644 23.9603 9.77314 21.869 7.12109 20.8877L1.97363 18.9834C0.00892512 18.2564 0.00892581 15.477 1.97363 14.75L7.12109 12.8457C9.77314 11.8644 11.8644 9.77314 12.8457 7.12109L14.75 1.97363Z" fill="#ff64d5"/>
          </svg>
          <img
            className="vibe-label-img"
            src="/image/vibe/vibe-lable.png"
            alt="vibe-label"
          />
          <svg className="vibe-label-lottie-two" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14.75 1.97363C15.477 0.00892581 18.2564 0.00892512 18.9834 1.97363L20.8877 7.12109C21.869 9.77314 23.9603 11.8644 26.6123 12.8457L31.7598 14.75C33.7245 15.477 33.7245 18.2564 31.7598 18.9834L26.6123 20.8877C23.9603 21.869 21.869 23.9603 20.8877 26.6123L18.9834 31.7598C18.2564 33.7245 15.477 33.7245 14.75 31.7598L12.8457 26.6123C11.8644 23.9603 9.77314 21.869 7.12109 20.8877L1.97363 18.9834C0.00892512 18.2564 0.00892581 15.477 1.97363 14.75L7.12109 12.8457C9.77314 11.8644 11.8644 9.77314 12.8457 7.12109L14.75 1.97363Z" fill="#ffd905"/>
          </svg>
        </div>

        <div className="vibe-items">
          {VIBE_ITEMS.map((item, idx) => (
            <span
              key={idx}
              className={`vibe-item ${activeItem === idx ? 'is-active' : ''}`}
            >
              <motion.img
                className="vibe-item-main"
                src={item.item}
                alt="item"
                animate={{ x: mouseOffset.x * 7, y: mouseOffset.y * 7 }}
                transition={{ type: 'spring', stiffness: 20, damping: 20 }}
              />
              <motion.img
                className="vibe-item-hover"
                src={item.itemHover}
                alt="item-hover"
                animate={{ x: mouseOffset.x * 7, y: mouseOffset.y * 7 }}
                transition={{ type: 'spring', stiffness: 20, damping: 20 }}
              />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
