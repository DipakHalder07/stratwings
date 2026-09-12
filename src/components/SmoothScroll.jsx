import { useEffect, useRef } from 'react';
import Lenis from '@studio-freight/lenis';

export default function SmoothScroll() {
  const lenisRef = useRef(null);

  useEffect(() => {
    let rafId;
    let resizeObserver;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (x) => 1 - Math.pow(1 - x, 3),
      smoothWheel: true
    });

    lenisRef.current = lenis;
    window.__lenis = lenis;

    const onRaf = (time) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(onRaf);
    };
    rafId = requestAnimationFrame(onRaf);

    resizeObserver = new ResizeObserver(() => {
      const scrollPos = window.scrollY;
      lenis.resize();
      window.scrollTo(0, scrollPos);
    });
    resizeObserver.observe(document.body);

    const onResize = () => lenis.resize();
    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
      resizeObserver.disconnect();
      cancelAnimationFrame(rafId);
      lenis.destroy();
      window.__lenis = null;
    };
  }, []);

  return null;
}
