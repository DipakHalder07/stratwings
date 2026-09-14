import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import Lottie from 'lottie-react';
import { boldLinesOne } from '../assets/lottie/animations';
import ConceptsSubtitleBg from './ConceptsSubtitleBg';

const PRODUCTS_FIRST = [
  { img: '/image/concepts/product/product1.png' },
  { img: '/image/concepts/product/product2.png', lottie: boldLinesOne },
  { img: '/image/concepts/product/product3.png' },
  { img: '/image/concepts/product/product4.png', lottie: boldLinesOne },
  { img: '/image/concepts/product/product5.png' }
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
  '/image/concepts/product/product16.png'
];

function useIsMobile(breakpoint = 1110) {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const update = () => setIsMobile(window.innerWidth <= breakpoint);
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, [breakpoint]);
  return isMobile;
}

export default function Concepts({ onOpenContact }) {
  const containerRef = useRef(null);
  const isMobile1110 = useIsMobile(1110);
  const isMobile614 = useIsMobile(614);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });

  // Desktop vertical scroll transforms
  const x = useTransform(scrollYProgress, [0, 1], ['-5%', '-37%']);
  const y = useTransform(scrollYProgress, [0, 1], ['-37%', '-5%']);
  const b = useSpring(x, { stiffness: 80, damping: 20 });
  const S = useSpring(y, { stiffness: 80, damping: 20 });

  // Mobile horizontal scroll transforms (creates the multi-row slider moving on scroll)
  const T = useTransform(scrollYProgress, [0, 1], isMobile1110 ? ['0%', '-30%'] : ['0%', '-60%']);
  const k = useTransform(scrollYProgress, [0, 1], isMobile1110 ? ['-30%', '0%'] : ['-60%', '0%']);
  const M = useSpring(T, { stiffness: isMobile1110 ? 50 : 80, damping: isMobile1110 ? 25 : 20 });
  const _ = useSpring(k, { stiffness: 80, damping: 20 });

  const RowSecond = ({ reverse = true }) => (
    <motion.div
      className="sw-concepts-products-inner"
      style={isMobile1110 ? { x: reverse ? _ : M } : { y: reverse ? S : b }}
    >
      <div className="sw-concepts-products-column">
        {PRODUCTS_SECOND.concat(PRODUCTS_SECOND).map((src, idx) => (
          <img src={src} alt="product" key={idx} />
        ))}
      </div>
    </motion.div>
  );

  return (
    <section className="sw-concepts" ref={containerRef}>
      <div className="sw-container">
        <div className="sw-concepts-content">
          {/* Titles & CTA */}
          <div className="sw-concepts-titles">
            <h2 className="sw-concepts-title">
              Bringing <span className="sw-brands">Concepts</span> <br />
              to life - beautifull<span className="sw-latter">y</span>
              <img
                className="sw-concepts-title-bg"
                src="/image/concepts/concepts-title-bg.png"
                alt="title-bg"
              />
            </h2>
            <p className="sw-concepts-subtitle">
              Your project deserves a place in our <br />
              gallery of standout designs
              <ConceptsSubtitleBg />
            </p>
            <button
              onClick={onOpenContact}
              className="sw-button sw-yellow-big sw-concepts-button"
            >
              <div className="sw-button-content">Start your project</div>
            </button>
          </div>

          {/* Products Grid (Desktop 3 vertical columns, Mobile horizontal multi-row sliders) */}
          <div className="sw-concepts-products-sticky sw-concepts-sticky">
            <div className="sw-concepts-products">
              {/* Row 1 / Col 1 */}
              <motion.div
                className="sw-concepts-products-inner"
                style={isMobile1110 ? { x: M } : { y: b }}
              >
                <div className="sw-concepts-products-column">
                  {PRODUCTS_FIRST.concat(PRODUCTS_FIRST).map((item, idx) => (
                    <div key={`c1-${idx}`} className="sw-concepts-product">
                      <img src={item.img} alt={`concept product 1-${idx + 1}`} />
                      {item.lottie && <Lottie className="sw-concepts-product-lottie" animationData={item.lottie} />}
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Row 2 / Col 2 */}
              <RowSecond reverse={true} />

              {/* Row 3 / Col 3 */}
              <motion.div
                className="sw-concepts-products-inner"
                style={isMobile1110 ? { x: M } : { y: b }}
              >
                <div className="sw-concepts-products-column">
                  {PRODUCTS_THIRD.concat(PRODUCTS_THIRD).map((src, idx) => (
                    <img src={src} alt={`concept product 3-${idx + 1}`} key={idx} />
                  ))}
                </div>
              </motion.div>

              {/* Row 4 (mobile < 614px) */}
              {isMobile614 && <RowSecond reverse={true} />}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
