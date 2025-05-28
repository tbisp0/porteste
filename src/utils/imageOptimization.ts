/**
 * Image Optimization Utilities
 * Handles image loading, fallbacks, and error handling
 */

interface ImageLoadOptions {
  src: string;
  fallback?: string;
  placeholder?: string;
  retryAttempts?: number;
  retryDelay?: number;
}

/**
 * Preload critical images to improve LCP
 */
export const preloadCriticalImages = () => {
  const baseUrl = import.meta.env.BASE_URL;
  const criticalImages = [
    `${baseUrl}images/tarcisio_bispo.webp`,
    `${baseUrl}images/tarcisio_bispo.png`,
    `${baseUrl}images/ixdf-symbol-dark.png`,
    `${baseUrl}images/ixdf-symbol-white.png`
  ];

  criticalImages.forEach(src => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = src;

    // Add error handling for missing images
    link.onerror = () => {
      console.warn(`Failed to preload image: ${src}`);
    };

    document.head.appendChild(link);
  });
};

/**
 * Load image with retry logic and fallback
 */
export const loadImageWithFallback = async (options: ImageLoadOptions): Promise<string> => {
  const { src, fallback, retryAttempts = 3, retryDelay = 1000 } = options;

  for (let attempt = 0; attempt < retryAttempts; attempt++) {
    try {
      await loadImage(src);
      return src;
    } catch (error) {
      console.warn(`Image load attempt ${attempt + 1} failed for: ${src}`);

      if (attempt < retryAttempts - 1) {
        await delay(retryDelay);
      }
    }
  }

  // If all attempts failed, try fallback
  if (fallback) {
    try {
      await loadImage(fallback);
      return fallback;
    } catch (error) {
      console.warn(`Fallback image also failed: ${fallback}`);
    }
  }

  // Return placeholder or empty string
  return options.placeholder || '';
};

/**
 * Load a single image
 */
const loadImage = (src: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = () => reject(new Error(`Failed to load image: ${src}`));
    img.src = src;
  });
};

/**
 * Delay utility
 */
const delay = (ms: number): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

/**
 * Generate responsive image URLs
 */
export const generateResponsiveImageUrls = (baseSrc: string, sizes: number[]): string => {
  const baseUrl = baseSrc.split('.').slice(0, -1).join('.');
  const extension = baseSrc.split('.').pop();

  return sizes
    .map(size => `${baseUrl}_${size}w.${extension} ${size}w`)
    .join(', ');
};

/**
 * Check if image exists
 */
export const imageExists = async (src: string): Promise<boolean> => {
  try {
    await loadImage(src);
    return true;
  } catch {
    return false;
  }
};

/**
 * Get optimized image path with fallbacks
 */
export const getOptimizedImagePath = (imageName: string): {
  webp: string;
  png: string;
  fallback: string;
} => {
  const baseUrl = import.meta.env.BASE_URL;
  const basePath = `${baseUrl}images/`;
  const name = imageName.replace(/\.(webp|png|jpg|jpeg)$/i, '');

  return {
    webp: `${basePath}${name}.webp`,
    png: `${basePath}${name}.png`,
    fallback: `${basePath}placeholder.png`
  };
};

/**
 * Create placeholder image data URL
 */
export const createPlaceholderDataUrl = (width: number, height: number, color = '#f3f4f6'): string => {
  const svg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="${color}"/>
      <text x="50%" y="50%" text-anchor="middle" dy=".3em" fill="#9ca3af" font-family="Arial, sans-serif" font-size="14">
        Loading...
      </text>
    </svg>
  `;

  return `data:image/svg+xml;base64,${btoa(svg)}`;
};

/**
 * Optimize image loading with intersection observer
 */
export const createImageIntersectionObserver = (callback: (entries: IntersectionObserverEntry[]) => void) => {
  if (!('IntersectionObserver' in window)) {
    // Fallback for browsers without IntersectionObserver
    return null;
  }

  return new IntersectionObserver(callback, {
    rootMargin: '50px 0px',
    threshold: 0.01
  });
};

/**
 * Batch preload images
 */
export const batchPreloadImages = async (imageSrcs: string[], batchSize = 3): Promise<void> => {
  for (let i = 0; i < imageSrcs.length; i += batchSize) {
    const batch = imageSrcs.slice(i, i + batchSize);

    await Promise.allSettled(
      batch.map(src => loadImageWithFallback({ src }))
    );

    // Small delay between batches to avoid overwhelming the network
    if (i + batchSize < imageSrcs.length) {
      await delay(100);
    }
  }
};

/**
 * Get image dimensions
 */
export const getImageDimensions = (src: string): Promise<{ width: number; height: number }> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      resolve({
        width: img.naturalWidth,
        height: img.naturalHeight
      });
    };
    img.onerror = () => reject(new Error(`Failed to load image: ${src}`));
    img.src = src;
  });
};

/**
 * Initialize image optimizations
 */
export const initializeImageOptimizations = () => {
  // Preload critical images
  preloadCriticalImages();

  // Set up intersection observer for lazy loading
  const observer = createImageIntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target as HTMLImageElement;
        const src = img.dataset.src;

        if (src) {
          loadImageWithFallback({ src })
            .then(loadedSrc => {
              img.src = loadedSrc;
              img.removeAttribute('data-src');
              img.classList.remove('lazy-loading');
              img.classList.add('lazy-loaded');
            })
            .catch(error => {
              console.warn('Failed to load lazy image:', error);
              img.classList.add('lazy-error');
            });
        }

        observer?.unobserve(img);
      }
    });
  });

  // Observe all images with data-src attribute
  if (observer) {
    const lazyImages = document.querySelectorAll('img[data-src]');
    lazyImages.forEach(img => observer.observe(img));
  }
};

export default {
  preloadCriticalImages,
  loadImageWithFallback,
  generateResponsiveImageUrls,
  imageExists,
  getOptimizedImagePath,
  createPlaceholderDataUrl,
  createImageIntersectionObserver,
  batchPreloadImages,
  getImageDimensions,
  initializeImageOptimizations
};
