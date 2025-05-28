import { useEffect } from 'react';

interface PrefetchOptions {
  routes?: string[];
  delay?: number;
  onHover?: boolean;
}

export const usePrefetch = ({
  routes = [],
  delay = 2000,
  onHover = true
}: PrefetchOptions = {}) => {

  useEffect(() => {
    // Prefetch automático após delay
    const timer = setTimeout(() => {
      routes.forEach(route => {
        prefetchRoute(route);
      });
    }, delay);

    return () => clearTimeout(timer);
  }, [routes, delay]);

  const prefetchRoute = (route: string) => {
    // Skip prefetch in development to avoid 404 errors
    if (!import.meta.env.PROD) {
      return;
    }

    // Criar link element para prefetch
    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = route;
    link.as = 'document';

    // Add error handling
    link.onerror = () => {
      console.warn(`Failed to prefetch route: ${route}`);
    };

    // Verificar se já não existe
    const existingLink = document.querySelector(`link[href="${route}"]`);
    if (!existingLink) {
      document.head.appendChild(link);
    }
  };

  const prefetchOnHover = (route: string) => {
    if (onHover) {
      prefetchRoute(route);
    }
  };

  // Prefetch de recursos críticos
  const prefetchCriticalResources = () => {
    // Only prefetch static files that actually exist in dist folder
    // SPA routes like /privacy-policy are handled by React Router and don't need prefetching
    const baseUrl = import.meta.env.BASE_URL;
    const criticalRoutes: string[] = [
      // Add only static files that exist in dist folder
      // SPA routes are handled by React Router
    ];

    criticalRoutes.forEach(route => {
      prefetchRoute(route);
    });
  };

  return {
    prefetchRoute,
    prefetchOnHover,
    prefetchCriticalResources
  };
};

// Hook para prefetch de imagens
export const useImagePrefetch = (imageSrcs: string[]) => {
  useEffect(() => {
    const prefetchImages = () => {
      imageSrcs.forEach(src => {
        const link = document.createElement('link');
        link.rel = 'prefetch';
        link.href = src;
        link.as = 'image';

        const existingLink = document.querySelector(`link[href="${src}"]`);
        if (!existingLink) {
          document.head.appendChild(link);
        }
      });
    };

    // Prefetch após um pequeno delay
    const timer = setTimeout(prefetchImages, 1000);
    return () => clearTimeout(timer);
  }, [imageSrcs]);
};

// Hook para intersection observer (lazy loading avançado)
export const useIntersectionObserver = (
  callback: (entries: IntersectionObserverEntry[]) => void,
  options: IntersectionObserverInit = {}
) => {
  useEffect(() => {
    const observer = new IntersectionObserver(callback, {
      rootMargin: '50px',
      threshold: 0.1,
      ...options
    });

    return () => observer.disconnect();
  }, [callback, options]);
};
