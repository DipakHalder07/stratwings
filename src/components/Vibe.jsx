import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Lottie from 'lottie-react';
import { lineThree, boldLinesOne } from '../assets/lottie/animations';

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
          <Lottie className="vibe-label-lottie-one" animationData={lineThree} />
          <img
            className="vibe-label-img"
            src="/image/vibe/vibe-lable.png"
            alt="vibe-label"
          />
          <Lottie className="vibe-label-lottie-two" animationData={boldLinesOne} />
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
