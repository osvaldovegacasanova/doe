import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function ScrollReveal({
  children,
  delay = 0,
  duration = 0.8,
  blur = 10,
  y = 30,
  className = ''
}) {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleChange);

    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // If user prefers reduced motion, show content immediately without animation
  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{
        opacity: 0,
        filter: `blur(${blur}px)`,
        y: y
      }}
      whileInView={{
        opacity: 1,
        filter: 'blur(0px)',
        y: 0
      }}
      viewport={{
        once: true, // Only animate once when scrolling down
        margin: '-100px', // Start animation 100px before element enters viewport
        amount: 0.3 // Trigger when 30% of element is visible
      }}
      transition={{
        duration: duration,
        delay: delay,
        ease: [0.25, 0.4, 0.25, 1] // Smooth cubic-bezier easing
      }}
    >
      {children}
    </motion.div>
  );
}
