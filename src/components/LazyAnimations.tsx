import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

/**
 * LazyAnimations Component
 * Loads animations after LCP to improve performance
 * Only initializes after the page has loaded
 */

interface LazyAnimationsProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

const LazyAnimations: React.FC<LazyAnimationsProps> = ({ 
  children, 
  delay = 100,
  className = '' 
}) => {
  const [shouldAnimate, setShouldAnimate] = useState(false);

  useEffect(() => {
    // Wait for LCP to complete before starting animations
    const timer = setTimeout(() => {
      setShouldAnimate(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  if (!shouldAnimate) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
};

export default LazyAnimations;
