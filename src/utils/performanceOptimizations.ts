/**
 * Performance optimizations to reduce DOM size and layout thrashing
 */

import React, { useEffect, useRef, useCallback } from 'react';

// Debounce function to reduce excessive function calls
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

// Throttle function for scroll events
export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

// Intersection Observer hook for lazy loading
export const useIntersectionObserver = (
  callback: (entries: IntersectionObserverEntry[]) => void,
  options: IntersectionObserverInit = {}
) => {
  const targetRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const target = targetRef.current;
    if (!target) return;

    const observer = new IntersectionObserver(callback, {
      threshold: 0.1,
      rootMargin: '50px',
      ...options
    });

    observer.observe(target);

    return () => {
      observer.unobserve(target);
      observer.disconnect();
    };
  }, [callback, options]);

  return targetRef;
};

// Reduce layout thrashing by batching DOM reads/writes
export class LayoutOptimizer {
  private readTasks: (() => void)[] = [];
  private writeTasks: (() => void)[] = [];
  private isScheduled = false;

  scheduleRead(task: () => void) {
    this.readTasks.push(task);
    this.schedule();
  }

  scheduleWrite(task: () => void) {
    this.writeTasks.push(task);
    this.schedule();
  }

  private schedule() {
    if (this.isScheduled) return;
    this.isScheduled = true;

    requestAnimationFrame(() => {
      // Execute all reads first
      while (this.readTasks.length > 0) {
        const task = this.readTasks.shift();
        task?.();
      }

      // Then execute all writes
      while (this.writeTasks.length > 0) {
        const task = this.writeTasks.shift();
        task?.();
      }

      this.isScheduled = false;
    });
  }
}

export const layoutOptimizer = new LayoutOptimizer();

// Hook to optimize component re-renders
export const useOptimizedCallback = <T extends (...args: any[]) => any>(
  callback: T,
  deps: React.DependencyList
): T => {
  return useCallback(callback, deps);
};

// Memoize expensive calculations
export const useMemoizedValue = <T>(
  factory: () => T,
  deps: React.DependencyList
): T => {
  return React.useMemo(factory, deps);
};

// Optimize scroll performance
export const useOptimizedScroll = (
  callback: (event: Event) => void,
  delay: number = 16
) => {
  const throttledCallback = useCallback(
    throttle(callback, delay),
    [callback, delay]
  );

  useEffect(() => {
    window.addEventListener('scroll', throttledCallback, { passive: true });
    return () => window.removeEventListener('scroll', throttledCallback);
  }, [throttledCallback]);
};

// Reduce DOM size by virtualizing long lists
export const useVirtualization = (
  items: any[],
  itemHeight: number,
  containerHeight: number
) => {
  const [scrollTop, setScrollTop] = React.useState(0);

  const startIndex = Math.floor(scrollTop / itemHeight);
  const endIndex = Math.min(
    startIndex + Math.ceil(containerHeight / itemHeight) + 1,
    items.length
  );

  const visibleItems = items.slice(startIndex, endIndex);
  const totalHeight = items.length * itemHeight;
  const offsetY = startIndex * itemHeight;

  const onScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    setScrollTop(e.currentTarget.scrollTop);
  }, []);

  return {
    visibleItems,
    totalHeight,
    offsetY,
    onScroll,
    startIndex,
    endIndex
  };
};

// Optimize image loading
export const useImageOptimization = () => {
  const preloadImage = useCallback((src: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve();
      img.onerror = reject;
      img.src = src;
    });
  }, []);

  const preloadImages = useCallback(async (srcs: string[]) => {
    try {
      await Promise.all(srcs.map(preloadImage));
    } catch (error) {
      console.warn('Failed to preload some images:', error);
    }
  }, [preloadImage]);

  return { preloadImage, preloadImages };
};

// Optimize animation performance
export const useAnimationOptimization = () => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const getOptimizedTransition = useCallback((duration: number = 0.3) => {
    if (prefersReducedMotion) {
      return { duration: 0.01 };
    }
    return {
      duration,
      ease: [0.16, 1, 0.3, 1] // Optimized easing
    };
  }, [prefersReducedMotion]);

  return { prefersReducedMotion, getOptimizedTransition };
};

// Monitor performance metrics
export const usePerformanceMonitor = () => {
  useEffect(() => {
    if (typeof window === 'undefined' || !window.performance) return;

    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry) => {
        if (entry.entryType === 'layout-shift') {
          console.warn('Layout shift detected:', entry);
        }
        if (entry.entryType === 'largest-contentful-paint') {
          console.log('LCP:', entry.startTime);
        }
      });
    });

    observer.observe({ entryTypes: ['layout-shift', 'largest-contentful-paint'] });

    return () => observer.disconnect();
  }, []);
};

// Optimize bundle size by code splitting
export const lazyImport = <T extends React.ComponentType<any>>(
  importFunc: () => Promise<{ default: T }>
): React.LazyExoticComponent<T> => {
  return React.lazy(importFunc);
};

// Cache expensive operations
const cache = new Map<string, any>();

export const memoize = <T extends (...args: any[]) => any>(
  fn: T,
  getKey?: (...args: Parameters<T>) => string
): T => {
  return ((...args: Parameters<T>) => {
    const key = getKey ? getKey(...args) : JSON.stringify(args);

    if (cache.has(key)) {
      return cache.get(key);
    }

    const result = fn(...args);
    cache.set(key, result);
    return result;
  }) as T;
};

// Clear cache when needed
export const clearCache = () => {
  cache.clear();
};

export default {
  debounce,
  throttle,
  useIntersectionObserver,
  layoutOptimizer,
  useOptimizedCallback,
  useMemoizedValue,
  useOptimizedScroll,
  useVirtualization,
  useImageOptimization,
  useAnimationOptimization,
  usePerformanceMonitor,
  lazyImport,
  memoize,
  clearCache
};
