import React, { useEffect, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

interface ScrollProgressProps {
  className?: string;
  showPercentage?: boolean;
  color?: string;
}

const ScrollProgress: React.FC<ScrollProgressProps> = ({ 
  className = '',
  showPercentage = false,
  color = 'hsl(var(--primary))'
}) => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const [scrollPercentage, setScrollPercentage] = useState(0);

  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (latest) => {
      setScrollPercentage(Math.round(latest * 100));
    });

    return () => unsubscribe();
  }, [scrollYProgress]);

  return (
    <>
      {/* Progress Bar */}
      <motion.div
        className={`fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-accent to-secondary origin-left z-50 ${className}`}
        style={{ 
          scaleX,
          background: `linear-gradient(90deg, ${color}, hsl(var(--accent)), hsl(var(--secondary)))`
        }}
      />

      {/* Optional Percentage Indicator */}
      {showPercentage && (
        <motion.div
          className="fixed top-4 right-4 z-50 bg-background/80 backdrop-blur-sm border border-border rounded-full px-3 py-1 text-sm font-medium text-foreground shadow-lg"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ 
            opacity: scrollPercentage > 5 ? 1 : 0,
            scale: scrollPercentage > 5 ? 1 : 0.8
          }}
          transition={{ duration: 0.2 }}
        >
          {scrollPercentage}%
        </motion.div>
      )}

      {/* Scroll Indicator with Icon */}
      <motion.div
        className="fixed top-0 right-4 z-50 flex items-center gap-2 bg-background/80 backdrop-blur-sm border border-border rounded-b-lg px-3 py-2 shadow-lg"
        initial={{ y: -100 }}
        animate={{ y: scrollPercentage > 10 ? 0 : -100 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
        <span className="text-xs font-medium text-muted-foreground">
          Lendo
        </span>
      </motion.div>
    </>
  );
};

export default ScrollProgress;
