import { useEffect, useRef } from 'react';

interface ParallaxOptions {
  speed?: number;
  direction?: 'up' | 'down';
  disabled?: boolean;
}

export const useParallax = (options: ParallaxOptions = {}) => {
  const { speed = 0.5, direction = 'up', disabled = false } = options;
  const elementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (disabled || !elementRef.current) return;

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const element = elementRef.current;
    let ticking = false;

    const updateParallax = () => {
      if (!element) return;

      const rect = element.getBoundingClientRect();
      const elementTop = rect.top;
      const elementHeight = rect.height;
      const windowHeight = window.innerHeight;

      // Calculate if element is in viewport
      const isInViewport = elementTop < windowHeight && elementTop + elementHeight > 0;

      if (isInViewport) {
        // Calculate scroll progress (0 to 1)
        const scrollProgress = (windowHeight - elementTop) / (windowHeight + elementHeight);
        
        // Calculate offset based on speed and direction
        const maxOffset = 100; // Maximum offset in pixels
        const offset = scrollProgress * maxOffset * speed;
        const finalOffset = direction === 'up' ? -offset : offset;

        // Apply transform using CSS custom property
        element.style.setProperty('--parallax-offset', `${finalOffset}px`);
      }

      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updateParallax);
        ticking = true;
      }
    };

    // Initial calculation
    updateParallax();

    // Add scroll listener
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [speed, direction, disabled]);

  return elementRef;
};

// Hook for multiple parallax layers with different speeds
export const useMultiParallax = () => {
  const slowRef = useParallax({ speed: 0.2 });
  const mediumRef = useParallax({ speed: 0.5 });
  const fastRef = useParallax({ speed: 0.8 });

  useEffect(() => {
    const updateAllLayers = () => {
      // Update CSS custom properties for all layers
      document.documentElement.style.setProperty(
        '--parallax-offset-slow',
        slowRef.current?.style.getPropertyValue('--parallax-offset') || '0px'
      );
      document.documentElement.style.setProperty(
        '--parallax-offset-medium',
        mediumRef.current?.style.getPropertyValue('--parallax-offset') || '0px'
      );
      document.documentElement.style.setProperty(
        '--parallax-offset-fast',
        fastRef.current?.style.getPropertyValue('--parallax-offset') || '0px'
      );
    };

    const handleScroll = () => {
      requestAnimationFrame(updateAllLayers);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [slowRef, mediumRef, fastRef]);

  return { slowRef, mediumRef, fastRef };
};

// Hook for section transitions
export const useSectionTransition = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -10% 0px'
      }
    );

    observer.observe(sectionRef.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  return sectionRef;
};
