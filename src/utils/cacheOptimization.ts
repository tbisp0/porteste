/**
 * Cache Optimization Utilities
 * Implements efficient caching strategies for static resources
 */

interface CacheConfig {
  maxAge: number;
  staleWhileRevalidate?: number;
  cacheFirst?: boolean;
}

const CACHE_CONFIGS: Record<string, CacheConfig> = {
  // Images - Long cache with stale-while-revalidate
  images: {
    maxAge: 31536000, // 1 year
    staleWhileRevalidate: 86400, // 1 day
    cacheFirst: true
  },
  // JavaScript bundles - Long cache
  scripts: {
    maxAge: 31536000, // 1 year
    cacheFirst: true
  },
  // CSS files - Long cache
  styles: {
    maxAge: 31536000, // 1 year
    cacheFirst: true
  },
  // Fonts - Very long cache
  fonts: {
    maxAge: 31536000, // 1 year
    cacheFirst: true
  },
  // API responses - Short cache with revalidation
  api: {
    maxAge: 300, // 5 minutes
    staleWhileRevalidate: 60 // 1 minute
  }
};

/**
 * Generate cache headers for different resource types
 */
export const getCacheHeaders = (resourceType: keyof typeof CACHE_CONFIGS): Record<string, string> => {
  const config = CACHE_CONFIGS[resourceType];

  if (!config) {
    return {};
  }

  const headers: Record<string, string> = {
    'Cache-Control': `public, max-age=${config.maxAge}`
  };

  if (config.staleWhileRevalidate) {
    headers['Cache-Control'] += `, stale-while-revalidate=${config.staleWhileRevalidate}`;
  }

  if (config.cacheFirst) {
    headers['Cache-Control'] += ', immutable';
  }

  return headers;
};

/**
 * Preload critical resources with proper cache headers
 */
export const preloadCriticalResources = () => {
  const baseUrl = import.meta.env.BASE_URL;
  const criticalResources = [
    {
      href: `${baseUrl}images/tarcisio_bispo.webp`,
      as: 'image',
      type: 'image/webp',
      fetchpriority: 'high'
    },
    {
      href: `${baseUrl}images/tarcisio_bispo.png`,
      as: 'image',
      type: 'image/png',
      fetchpriority: 'high'
    }
    // Font CSS removed to avoid unused preload warnings
    // Fonts will be loaded naturally by the browser when needed
  ];

  criticalResources.forEach(resource => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = resource.href;
    link.as = resource.as;

    if (resource.type) {
      link.type = resource.type;
    }

    if (resource.fetchpriority) {
      link.setAttribute('fetchpriority', resource.fetchpriority);
    }

    if (resource.crossorigin && resource.crossorigin !== '') {
      link.setAttribute('crossorigin', resource.crossorigin);
    }

    // Add error handling for missing resources
    link.onerror = () => {
      console.warn(`Failed to preload resource: ${resource.href}`);
    };

    document.head.appendChild(link);
  });
};

/**
 * Implement service worker for advanced caching
 */
export const registerServiceWorker = async () => {
  if ('serviceWorker' in navigator) {
    try {
      // Use correct path for GitHub Pages
      const swPath = import.meta.env.BASE_URL + 'sw.js';
      const registration = await navigator.serviceWorker.register(swPath);
      console.log('Service Worker registered successfully:', registration);
      return registration;
    } catch (error) {
      console.warn('Service Worker registration failed:', error);
      return null;
    }
  }
  return null;
};

/**
 * Optimize image loading with intersection observer
 */
export const createImageObserver = () => {
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement;

          // Load the image
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
          }

          // Load srcset if available
          if (img.dataset.srcset) {
            img.srcset = img.dataset.srcset;
            img.removeAttribute('data-srcset');
          }

          // Remove loading class
          img.classList.remove('lazy-loading');
          img.classList.add('lazy-loaded');

          // Stop observing this image
          imageObserver.unobserve(img);
        }
      });
    }, {
      rootMargin: '50px 0px', // Start loading 50px before the image enters viewport
      threshold: 0.01
    });

    return imageObserver;
  }

  return null;
};

/**
 * Prefetch next page resources
 */
export const prefetchNextPageResources = (nextPageUrls: string[]) => {
  if ('requestIdleCallback' in window) {
    requestIdleCallback(() => {
      nextPageUrls.forEach(url => {
        const link = document.createElement('link');
        link.rel = 'prefetch';
        link.href = url;
        document.head.appendChild(link);
      });
    });
  } else {
    // Fallback for browsers without requestIdleCallback
    setTimeout(() => {
      nextPageUrls.forEach(url => {
        const link = document.createElement('link');
        link.rel = 'prefetch';
        link.href = url;
        document.head.appendChild(link);
      });
    }, 2000);
  }
};

/**
 * Optimize font loading
 */
export const optimizeFontLoading = () => {
  // Add font-display: swap to existing font links
  const fontLinks = document.querySelectorAll('link[href*="fonts.googleapis.com"]');
  fontLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href && !href.includes('display=swap')) {
      const url = new URL(href);
      url.searchParams.set('display', 'swap');
      link.setAttribute('href', url.toString());
    }
  });

  // Skip font preloading to avoid unused preload warnings
  // Fonts will be loaded when needed by the CSS
};

/**
 * Initialize all cache optimizations
 */
export const initializeCacheOptimizations = () => {
  // Skip preload in development to avoid warnings
  if (import.meta.env.PROD) {
    // Preload critical resources only in production
    preloadCriticalResources();
  }

  // Optimize font loading
  optimizeFontLoading();

  // Register service worker only in production
  if (import.meta.env.PROD) {
    registerServiceWorker();
  }

  // Create image observer for lazy loading
  const imageObserver = createImageObserver();

  if (imageObserver) {
    // Observe all images with data-src attribute
    const lazyImages = document.querySelectorAll('img[data-src]');
    lazyImages.forEach(img => imageObserver.observe(img));
  }

  // Skip prefetch in development
  if (import.meta.env.PROD) {
    // Only prefetch static resources that actually exist
    // SPA routes are handled by React Router and don't need prefetching
    const baseUrl = import.meta.env.BASE_URL;
    const nextPageUrls: string[] = [
      // Add only static files that exist in dist folder
      // SPA routes like /privacy-policy are handled by React Router
    ];

    if (nextPageUrls.length > 0) {
      prefetchNextPageResources(nextPageUrls);
    }
  }
};

export default {
  getCacheHeaders,
  preloadCriticalResources,
  registerServiceWorker,
  createImageObserver,
  prefetchNextPageResources,
  optimizeFontLoading,
  initializeCacheOptimizations
};
