import { useState, useEffect, useCallback } from 'react';
import { useLCP } from './useLCP';
import { useIntersection } from './useIntersection';

interface UseOptimizedImageProps {
  src: string;
  priority?: boolean;
  onError?: (error: Error) => void;
  onLoad?: () => void;
}

export const useOptimizedImage = ({
  src,
  priority = false,
  onError,
  onLoad,
}: UseOptimizedImageProps) => {
  const [imgSrc, setImgSrc] = useState<string>('');
  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);
  const { registerLCP } = useLCP();

  const loadWebP = useCallback((originalSrc: string) => {
    const webpSrc = originalSrc.replace(/\.(jpe?g|png)$/i, '.webp');
    
    return new Promise<string>((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(webpSrc);
      img.onerror = () => reject(new Error('WebP not supported'));
      img.src = webpSrc;
    });
  }, []);

  const loadFallback = useCallback((originalSrc: string) => {
    return new Promise<string>((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(originalSrc);
      img.onerror = () => reject(new Error('Image load failed'));
      img.src = originalSrc;
    });
  }, []);

  useEffect(() => {
    const loadImage = async () => {
      try {
        // Try WebP first
        const loadedSrc = await loadWebP(src);
        setImgSrc(loadedSrc);
        setIsLoaded(true);
        onLoad?.();
        
        // Register as LCP if priority
        if (priority) {
          registerLCP(loadedSrc);
        }
      } catch (webpError) {
        try {
          // Fallback to original format
          const loadedSrc = await loadFallback(src);
          setImgSrc(loadedSrc);
          setIsLoaded(true);
          onLoad?.();
        } catch (originalError) {
          setIsError(true);
          onError?.(originalError as Error);
        }
      }
    };

    // Only load when in viewport or if priority
    if (priority) {
      loadImage();
    } else {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            loadImage();
            observer.disconnect();
          }
        },
        { threshold: 0.1, rootMargin: '200px' }
      );

      const imgElement = document.createElement('div');
      observer.observe(imgElement);

      return () => observer.disconnect();
    }
  }, [src, priority, registerLCP, onLoad, onError, loadWebP, loadFallback]);

  return {
    imgSrc,
    isLoaded,
    isError,
  };
};
