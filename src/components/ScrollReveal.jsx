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
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleChange);

    // Detect mobile devices
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  // If user prefers reduced motion, show content immediately without animation
  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  // Reduce blur significantly on mobile to prevent rendering issues
  const effectiveBlur = isMobile ? Math.min(blur, 3) : blur;
  const effectiveY = isMobile ? Math.min(y, 15) : y;

  return (
    <motion.div
      className={className}
      initial={{
        opacity: 0,
        filter: `blur(${effectiveBlur}px)`,
        y: effectiveY
      }}
      whileInView={{
        opacity: 1,
        filter: 'blur(0px)',
        y: 0
      }}
      viewport={{
        once: true,
        margin: isMobile ? '-50px' : '-100px', // Smaller margin on mobile
        amount: isMobile ? 0.1 : 0.3 // Lower threshold on mobile - triggers earlier
      }}
      transition={{
        duration: isMobile ? 0.5 : duration, // Faster animations on mobile
        delay: isMobile ? delay * 0.5 : delay, // Reduced delay on mobile
        ease: [0.25, 0.4, 0.25, 1]
      }}
    >
      {children}
    </motion.div>
  );
}
