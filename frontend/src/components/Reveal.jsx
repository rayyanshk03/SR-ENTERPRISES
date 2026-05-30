import React from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';

/**
 * Wraps content with a scroll-triggered reveal animation.
 * - `as` lets you choose the tag (default: div)
 * - `stagger` toggles staggered reveal for direct children
 * - All other props pass through to the wrapper element.
 */
const Reveal = ({ as: Tag = 'div', stagger = false, className = '', children, ...rest }) => {
  const { ref, isVisible } = useScrollReveal();
  const base = stagger ? 'reveal-stagger' : 'reveal';
  const cls = `${base}${isVisible ? ' is-visible' : ''} ${className}`.trim();

  return (
    <Tag ref={ref} className={cls} {...rest}>
      {children}
    </Tag>
  );
};

export default Reveal;
