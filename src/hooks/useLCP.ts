import { useEffect, useCallback, useRef } from 'react';

interface UseLCPOptions {
  onLCPComplete?: (duration: number) => void;
}

export const useLCP = (options?: UseLCPOptions) => {
  const lcpImageRef = useRef<HTMLImageElement | null>(null);
  const lcpTextRef = useRef<HTMLElement | null>(null);
  const startTimeRef = useRef<number>(performance.now());
  const lcpCompletedRef = useRef<boolean>(false);
  
  // Function to register an element as an LCP candidate
  const registerLCP = useCallback((element: HTMLElement | string) => {
    if (typeof element === 'string') {
      // Handle image URLs
      const imgElement = new Image();
      imgElement.src = element;
      imgElement.onload = () => {
        if (!lcpCompletedRef.current) {
          const loadTime = performance.now() - startTimeRef.current;
          lcpCompletedRef.current = true;
          options?.onLCPComplete?.(loadTime);
        }
      };
      lcpImageRef.current = imgElement;
    } else {
      // Handle DOM elements
      if (element.tagName === 'IMG') {
        lcpImageRef.current = element as HTMLImageElement;
        
        if (lcpImageRef.current.complete) {
          if (!lcpCompletedRef.current) {
            const loadTime = performance.now() - startTimeRef.current;
            lcpCompletedRef.current = true;
            options?.onLCPComplete?.(loadTime);
          }
        } else {
          lcpImageRef.current.onload = () => {
            if (!lcpCompletedRef.current) {
              const loadTime = performance.now() - startTimeRef.current;
              lcpCompletedRef.current = true;
              options?.onLCPComplete?.(loadTime);
            }
          };
        }
      } else {
        // Text elements
        lcpTextRef.current = element;
        
        // For text elements, we consider them loaded immediately
        if (!lcpCompletedRef.current) {
          const loadTime = performance.now() - startTimeRef.current;
          lcpCompletedRef.current = true;
          options?.onLCPComplete?.(loadTime);
        }
      }
    }
  }, [options]);
  
  // Measure LCP using the web-vitals API if available
  useEffect(() => {
    const measureLCP = async () => {
      if ('webVitals' in window) {
        try {
          const { onLCP } = await import('web-vitals');
          onLCP(({ value }) => {
            if (!lcpCompletedRef.current) {
              lcpCompletedRef.current = true;
              options?.onLCPComplete?.(value);
            }
          });
        } catch (error) {
          console.error('Failed to load web-vitals:', error);
        }
      }
    };
    
    measureLCP();
    
    // Reset on unmount
    return () => {
      lcpImageRef.current = null;
      lcpTextRef.current = null;
    };
  }, [options]);
  
  return { registerLCP };
};

export default useLCP;