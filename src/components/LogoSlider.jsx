import { motion, useMotionValue, useAnimationFrame } from 'framer-motion';
import { useState, useRef } from 'react';

export default function LogoSlider({ logos }) {
  const [isPaused, setIsPaused] = useState(false);
  const baseVelocity = -0.5; // Negative = left-to-right scroll
  const x = useMotionValue(0);
  const containerRef = useRef(null);

  // Triple duplicate for seamless loop
  const duplicatedLogos = [...logos, ...logos, ...logos];

  // Animation frame loop
  useAnimationFrame((t, delta) => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || isPaused) return;

    const moveBy = baseVelocity * (delta / 16.67);
    let newX = x.get() + moveBy;

    // Reset for infinite loop
    const resetPoint = -(containerRef.current?.scrollWidth / 3 || 0);
    if (newX < resetPoint) newX = 0;

    x.set(newX);
  });

  return (
    <div
      className="relative w-full overflow-hidden py-12 md:py-16"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <motion.div
        ref={containerRef}
        style={{ x }}
        className="flex gap-12 md:gap-16 lg:gap-20"
      >
        {duplicatedLogos.map((logo, index) => (
          <div
            key={`${logo.name}-${index}`}
            className="flex-shrink-0 group flex items-center justify-center
                       w-32 h-12 md:w-40 md:h-16 lg:w-48 lg:h-20"
          >
            {logo.url ? (
              <a
                href={logo.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-full h-full"
              >
                <img
                  src={logo.image}
                  alt={logo.name}
                  className="max-w-full max-h-full w-auto h-auto object-contain
                             grayscale group-hover:grayscale-0
                             opacity-60 group-hover:opacity-100
                             transition-all duration-300 ease-out"
                />
              </a>
            ) : (
              <img
                src={logo.image}
                alt={logo.name}
                className="max-w-full max-h-full w-auto h-auto object-contain
                           grayscale group-hover:grayscale-0
                           opacity-60 group-hover:opacity-100
                           transition-all duration-300 ease-out"
              />
            )}
          </div>
        ))}
      </motion.div>
    </div>
  );
}
