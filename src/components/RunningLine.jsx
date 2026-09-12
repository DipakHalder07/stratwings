import React, { useRef, useState, useEffect } from 'react';
import { motion, useSpring } from 'framer-motion';

const ITEMS = [
  'branding',
  'packaging',
  'naming',
  'packaging',
  '3d illustration',
  '2d illustration',
  'animation',
  'logo',
  'branding',
  'packaging',
  'naming',
  'packaging',
  '3d illustration',
  '2d illustration',
  'animation',
  'logo'
];

export default function RunningLine() {
  const r = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!r.current) return;
      const rect = r.current.getBoundingClientRect();
      const h = window.innerHeight;
      const progress = Math.min(Math.max((h - rect.top) / (rect.height + h), 0), 1);
      setScrollProgress(progress);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const x = useSpring(0, { stiffness: 100, damping: 40 });

  useEffect(() => {
    x.set(50 - scrollProgress * 100);
  }, [scrollProgress, x]);

  return (
    <div className="sw-running-line" ref={r}>
      <img className="sw-running-line-bg" src="/image/concepts/concept-running-bg.png" alt="running line bg" />
      <motion.div className="sw-running-line-wrapper" style={{ x }}>
        {[...ITEMS, ...ITEMS, ...ITEMS].map((item, idx) => (
          <span className="sw-running-line-item" key={idx}>
            {item}
            <img className="sw-running-line-dot" src="/image/concepts/concepts-running-dot.png" alt="dot" />
          </span>
        ))}
      </motion.div>
    </div>
  );
}
