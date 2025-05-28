import { useEffect, useState } from 'react';

/**
 * Hook for lazy loading non-critical resources
 * Delays loading until main thread is less busy
 */
export const useLazyLoad = (delay: number = 2000) => {
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    // Use requestIdleCallback if available, otherwise setTimeout
    const loadWhenIdle = () => {
      if ('requestIdleCallback' in window) {
        window.requestIdleCallback(() => {
          setShouldLoad(true);
        }, { timeout: delay });
      } else {
        setTimeout(() => {
          setShouldLoad(true);
        }, delay);
      }
    };

    loadWhenIdle();
  }, [delay]);

  return shouldLoad;
};

/**
 * Hook for loading resources after user interaction
 */
export const useInteractionLoad = () => {
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const handleInteraction = () => {
      setShouldLoad(true);
      // Remove listeners after first interaction
      window.removeEventListener('scroll', handleInteraction);
      window.removeEventListener('click', handleInteraction);
      window.removeEventListener('keydown', handleInteraction);
      window.removeEventListener('touchstart', handleInteraction);
    };

    // Load on any user interaction
    window.addEventListener('scroll', handleInteraction, { passive: true });
    window.addEventListener('click', handleInteraction, { passive: true });
    window.addEventListener('keydown', handleInteraction, { passive: true });
    window.addEventListener('touchstart', handleInteraction, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleInteraction);
      window.removeEventListener('click', handleInteraction);
      window.removeEventListener('keydown', handleInteraction);
      window.removeEventListener('touchstart', handleInteraction);
    };
  }, []);

  return shouldLoad;
};

/**
 * Hook for loading resources when element is in viewport
 */
export const useInViewLoad = (ref: React.RefObject<HTMLElement>) => {
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [ref]);

  return shouldLoad;
};
