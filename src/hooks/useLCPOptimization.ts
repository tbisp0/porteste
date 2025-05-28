import { useEffect, useState } from 'react';

/**
 * Hook to optimize LCP (Largest Contentful Paint)
 * Delays non-critical animations until after LCP is complete
 */

interface LCPOptimizationOptions {
  delay?: number;
  enableAnimations?: boolean;
}

export const useLCPOptimization = (options: LCPOptimizationOptions = {}) => {
  const { delay = 100, enableAnimations = true } = options;
  const [isLCPComplete, setIsLCPComplete] = useState(false);
  const [shouldAnimate, setShouldAnimate] = useState(false);

  useEffect(() => {
    // Check if PerformanceObserver is available
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lcpEntry = entries[entries.length - 1] as PerformanceEntry & {
          renderTime?: number;
          loadTime?: number;
        };

        if (lcpEntry) {
          // LCP detected, mark as complete
          setIsLCPComplete(true);
          observer.disconnect();
          
          // Start animations after a small delay
          if (enableAnimations) {
            setTimeout(() => {
              setShouldAnimate(true);
            }, delay);
          }
        }
      });

      try {
        observer.observe({ entryTypes: ['largest-contentful-paint'] });
      } catch (error) {
        console.warn('LCP observation not supported:', error);
        // Fallback: assume LCP is complete after a timeout
        setTimeout(() => {
          setIsLCPComplete(true);
          if (enableAnimations) {
            setShouldAnimate(true);
          }
        }, 1000);
      }

      // Cleanup observer on unmount
      return () => {
        observer.disconnect();
      };
    } else {
      // Fallback for browsers without PerformanceObserver
      setTimeout(() => {
        setIsLCPComplete(true);
        if (enableAnimations) {
          setShouldAnimate(true);
        }
      }, 1000);
    }
  }, [delay, enableAnimations]);

  // Additional fallback: ensure animations start even if LCP detection fails
  useEffect(() => {
    const fallbackTimer = setTimeout(() => {
      setIsLCPComplete(true);
      if (enableAnimations) {
        setShouldAnimate(true);
      }
    }, 2000); // 2 second fallback

    return () => clearTimeout(fallbackTimer);
  }, [enableAnimations]);

  return {
    isLCPComplete,
    shouldAnimate: enableAnimations ? shouldAnimate : false,
  };
};

/**
 * Hook specifically for TypewriterText optimization
 * Ensures the first string is rendered immediately for LCP
 */
export const useTypewriterLCPOptimization = () => {
  const [showTypewriter, setShowTypewriter] = useState(false);
  const { isLCPComplete } = useLCPOptimization({ delay: 500 });

  useEffect(() => {
    if (isLCPComplete) {
      // Small delay to ensure LCP measurement is complete
      const timer = setTimeout(() => {
        setShowTypewriter(true);
      }, 200);

      return () => clearTimeout(timer);
    }
  }, [isLCPComplete]);

  return {
    showTypewriter,
    isLCPComplete,
  };
};

export default useLCPOptimization;
