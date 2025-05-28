import React, { useRef, useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { gsap } from 'gsap';

interface HorizontalScrollProps {
  children: React.ReactNode;
  className?: string;
  showIndicators?: boolean;
  snapToItems?: boolean;
}

const HorizontalScroll: React.FC<HorizontalScrollProps> = ({
  children,
  className = '',
  showIndicators = true,
  snapToItems = true
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [itemCount, setItemCount] = useState(0);

  const x = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 30 });

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (!scrollRef.current) return;
    
    const children = scrollRef.current.children;
    setItemCount(children.length);
  }, [children]);

  useEffect(() => {
    if (!containerRef.current || !scrollRef.current || !isMobile) return;

    const container = containerRef.current;
    const scroll = scrollRef.current;
    
    const updateScrollProgress = () => {
      const scrollLeft = container.scrollLeft;
      const maxScroll = scroll.scrollWidth - container.clientWidth;
      const progress = maxScroll > 0 ? scrollLeft / maxScroll : 0;
      setScrollProgress(progress);
    };

    container.addEventListener('scroll', updateScrollProgress);
    
    // Smooth scroll behavior
    container.style.scrollBehavior = 'smooth';
    
    return () => {
      container.removeEventListener('scroll', updateScrollProgress);
    };
  }, [isMobile]);

  const handleDragStart = () => {
    setIsDragging(true);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    
    if (!containerRef.current || !scrollRef.current || !snapToItems) return;
    
    // Snap to nearest item
    const container = containerRef.current;
    const itemWidth = container.clientWidth * 0.8; // Assuming 80% width items
    const currentScroll = container.scrollLeft;
    const targetIndex = Math.round(currentScroll / itemWidth);
    const targetScroll = targetIndex * itemWidth;
    
    container.scrollTo({
      left: targetScroll,
      behavior: 'smooth'
    });
  };

  // Don't render horizontal scroll on desktop
  if (!isMobile) {
    return (
      <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${className}`}>
        {children}
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      {/* Scroll Container */}
      <div
        ref={containerRef}
        className="overflow-x-auto overflow-y-hidden scrollbar-hide"
        style={{
          scrollSnapType: snapToItems ? 'x mandatory' : 'none',
          WebkitOverflowScrolling: 'touch'
        }}
      >
        <motion.div
          ref={scrollRef}
          className="flex gap-4 pb-4"
          drag="x"
          dragConstraints={containerRef}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          style={{ x: springX }}
        >
          {React.Children.map(children, (child, index) => (
            <motion.div
              key={index}
              className="flex-shrink-0 w-[80vw] max-w-sm"
              style={{
                scrollSnapAlign: snapToItems ? 'start' : 'none'
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              {child}
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Scroll Indicators */}
      {showIndicators && itemCount > 1 && (
        <div className="flex justify-center mt-4 gap-2">
          {Array.from({ length: itemCount }).map((_, index) => {
            const isActive = Math.round(scrollProgress * (itemCount - 1)) === index;
            return (
              <motion.div
                key={index}
                className={`h-2 rounded-full transition-all duration-300 ${
                  isActive 
                    ? 'w-8 bg-primary' 
                    : 'w-2 bg-muted-foreground/30'
                }`}
                animate={{
                  scale: isActive ? 1.2 : 1,
                  opacity: isActive ? 1 : 0.5
                }}
                transition={{ duration: 0.3 }}
              />
            );
          })}
        </div>
      )}

      {/* Scroll Hint */}
      <motion.div
        className="absolute top-1/2 right-4 transform -translate-y-1/2 text-muted-foreground"
        initial={{ opacity: 1, x: 0 }}
        animate={{ 
          opacity: scrollProgress > 0.1 ? 0 : 1,
          x: scrollProgress > 0.1 ? 20 : 0
        }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex items-center gap-2 text-sm">
          <span>Deslize</span>
          <motion.div
            animate={{ x: [0, 5, 0] }}
            transition={{ 
              duration: 1.5, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            →
          </motion.div>
        </div>
      </motion.div>

      {/* Custom scrollbar for mobile */}
      <div className="relative mt-2 h-1 bg-muted-foreground/20 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-primary rounded-full"
          style={{
            width: `${Math.max(20, (1 / itemCount) * 100)}%`,
            x: `${scrollProgress * (100 - Math.max(20, (1 / itemCount) * 100))}%`
          }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </div>
  );
};

export default HorizontalScroll;
