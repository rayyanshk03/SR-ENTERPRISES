import { useEffect, useRef, useState } from 'react';

/**
 * Reveals an element when it enters the viewport.
 * Returns { ref, isVisible } — apply `ref` to the element and use
 * `isVisible` to toggle a CSS class.
 */
export const useScrollReveal = ({ threshold = 0.15, rootMargin = '0px 0px -60px 0px' } = {}) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    // Respect prefers-reduced-motion
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold, rootMargin }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  return { ref, isVisible };
};

/**
 * Lightweight parallax: returns a `ref` and a `style` that translates
 * the element on Y axis based on scroll position.
 */
export const useParallax = (strength = 0.25) => {
  const ref = useRef(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    let ticking = false;
    const update = () => {
      const rect = node.getBoundingClientRect();
      const viewport = window.innerHeight;
      // Element center relative to viewport center
      const center = rect.top + rect.height / 2 - viewport / 2;
      setOffset(-center * strength);
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(update);
        ticking = true;
      }
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', update);
    };
  }, [strength]);

  return { ref, style: { transform: `translate3d(0, ${offset.toFixed(2)}px, 0)` } };
};
