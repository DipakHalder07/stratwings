import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

const PRODUCTS_FIRST = [
  '/image/concepts/product/product1.png',
  '/image/concepts/product/product2.png',
  '/image/concepts/product/product3.png',
  '/image/concepts/product/product4.png',
  '/image/concepts/product/product5.png'
];

const PRODUCTS_SECOND = [
  '/image/concepts/product/product6.png',
  '/image/concepts/product/product7.png',
  '/image/concepts/product/product8.png',
  '/image/concepts/product/product9.png',
  '/image/concepts/product/product10.png',
  '/image/concepts/product/product11.png'
];

const PRODUCTS_THIRD = [
  '/image/concepts/product/product12.png',
  '/image/concepts/product/product13.png',
  '/image/concepts/product/product14.png',
  '/image/concepts/product/product15.png',
  '/image/concepts/product/product16.png',
  '/image/concepts/product/product6.png'
];

export default function Concepts({ onOpenContact }) {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });

  // Column 1: slight upward drift
  const y1 = useTransform(scrollYProgress, [0, 1], ['0%', '-15%']);
  // Column 2: upward scroll parallax
  const y2 = useTransform(scrollYProgress, [0, 1], ['5%', '-35%']);
  // Column 3: downward opposing scroll parallax
  const y3 = useTransform(scrollYProgress, [0, 1], ['-30%', '5%']);

  const smoothY1 = useSpring(y1, { stiffness: 70, damping: 22 });
  const smoothY2 = useSpring(y2, { stiffness: 70, damping: 22 });
  const smoothY3 = useSpring(y3, { stiffness: 70, damping: 22 });

  return (
    <section className="concepts" ref={containerRef}>
      <div className="container">
        <div className="concepts-content">
          {/* Sticky Left Column: Titles & CTA */}
          <div className="concepts-titles">
            <h2 className="concepts-title">
              Bringing <span className="brands">Concepts</span> <br />
              to life - beautifull<span className="latter">y</span>
              <img
                className="concepts-title-bg"
                src="/image/concepts/concepts-title-bg.png"
                alt="title-bg"
              />
            </h2>
            <p className="concepts-subtitle">
              Your project deserves a place in our <br />
              gallery of standout designs
            </p>
            <button
              onClick={onOpenContact}
              className="button yellow-big concepts-button"
            >
              <div className="button-content">Start your project</div>
            </button>
          </div>

          {/* 3-Column Parallax Products Grid */}
          <div className="concepts-products-sticky">
            <div className="concepts-products">
              {/* Column 1 */}
              <motion.div className="concepts-products-inner" style={{ y: smoothY1 }}>
                <div className="concepts-products-column">
                  {PRODUCTS_FIRST.concat(PRODUCTS_FIRST).map((src, idx) => (
                    <div key={`c1-${idx}`} className="concepts-product">
                      <img src={src} alt={`concept product 1-${idx + 1}`} />
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Column 2 */}
              <motion.div className="concepts-products-inner" style={{ y: smoothY2 }}>
                <div className="concepts-products-column">
                  {PRODUCTS_SECOND.concat(PRODUCTS_SECOND).map((src, idx) => (
                    <div key={`c2-${idx}`} className="concepts-product">
                      <img src={src} alt={`concept product 2-${idx + 1}`} />
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Column 3 */}
              <motion.div className="concepts-products-inner" style={{ y: smoothY3 }}>
                <div className="concepts-products-column">
                  {PRODUCTS_THIRD.concat(PRODUCTS_THIRD).map((src, idx) => (
                    <div key={`c3-${idx}`} className="concepts-product">
                      <img src={src} alt={`concept product 3-${idx + 1}`} />
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
