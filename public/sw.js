/**
 * Service Worker for Portfolio Website
 * Implements caching strategies for better performance
 */

const CACHE_NAME = 'portfolio-v1';
const STATIC_CACHE_NAME = 'portfolio-static-v1';
const DYNAMIC_CACHE_NAME = 'portfolio-dynamic-v1';

// Resources to cache immediately
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/images/tarcisio_bispo.webp',
  '/images/tarcisio_bispo.png',
  '/images/ixdf-symbol-dark.png',
  '/images/ixdf-symbol-white.png',
  '/manifest.json'
];

// Cache strategies for different resource types
const CACHE_STRATEGIES = {
  // Images: Cache first with long expiration
  images: {
    strategy: 'cacheFirst',
    maxAge: 31536000, // 1 year
    maxEntries: 100
  },
  // JavaScript/CSS: Stale while revalidate
  assets: {
    strategy: 'staleWhileRevalidate',
    maxAge: 86400, // 1 day
    maxEntries: 50
  },
  // API calls: Network first with fallback
  api: {
    strategy: 'networkFirst',
    maxAge: 300, // 5 minutes
    maxEntries: 20
  },
  // Pages: Network first with cache fallback
  pages: {
    strategy: 'networkFirst',
    maxAge: 3600, // 1 hour
    maxEntries: 10
  }
};

/**
 * Install event - Cache static assets
 */
self.addEventListener('install', event => {
  console.log('Service Worker installing...');
  
  event.waitUntil(
    caches.open(STATIC_CACHE_NAME)
      .then(cache => {
        console.log('Caching static assets...');
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => {
        console.log('Static assets cached successfully');
        return self.skipWaiting();
      })
      .catch(error => {
        console.error('Failed to cache static assets:', error);
      })
  );
});

/**
 * Activate event - Clean up old caches
 */
self.addEventListener('activate', event => {
  console.log('Service Worker activating...');
  
  event.waitUntil(
    caches.keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            if (cacheName !== STATIC_CACHE_NAME && 
                cacheName !== DYNAMIC_CACHE_NAME &&
                cacheName !== CACHE_NAME) {
              console.log('Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log('Service Worker activated');
        return self.clients.claim();
      })
  );
});

/**
 * Fetch event - Implement caching strategies
 */
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }
  
  // Skip chrome-extension and other non-http requests
  if (!url.protocol.startsWith('http')) {
    return;
  }
  
  // Determine cache strategy based on resource type
  const strategy = getCacheStrategy(request);
  
  event.respondWith(
    handleRequest(request, strategy)
  );
});

/**
 * Determine cache strategy based on request
 */
function getCacheStrategy(request) {
  const url = new URL(request.url);
  const pathname = url.pathname;
  
  // Images
  if (pathname.match(/\.(jpg|jpeg|png|gif|webp|svg|ico)$/i)) {
    return CACHE_STRATEGIES.images;
  }
  
  // JavaScript and CSS
  if (pathname.match(/\.(js|css)$/i)) {
    return CACHE_STRATEGIES.assets;
  }
  
  // API calls
  if (pathname.startsWith('/api/') || url.hostname !== self.location.hostname) {
    return CACHE_STRATEGIES.api;
  }
  
  // Pages
  return CACHE_STRATEGIES.pages;
}

/**
 * Handle request based on strategy
 */
async function handleRequest(request, strategy) {
  const cacheName = getDynamicCacheName(request);
  
  switch (strategy.strategy) {
    case 'cacheFirst':
      return cacheFirst(request, cacheName, strategy);
    
    case 'networkFirst':
      return networkFirst(request, cacheName, strategy);
    
    case 'staleWhileRevalidate':
      return staleWhileRevalidate(request, cacheName, strategy);
    
    default:
      return fetch(request);
  }
}

/**
 * Cache first strategy
 */
async function cacheFirst(request, cacheName, strategy) {
  try {
    const cache = await caches.open(cacheName);
    const cachedResponse = await cache.match(request);
    
    if (cachedResponse) {
      // Check if cache is still valid
      const cacheDate = new Date(cachedResponse.headers.get('date') || 0);
      const now = new Date();
      const age = (now.getTime() - cacheDate.getTime()) / 1000;
      
      if (age < strategy.maxAge) {
        return cachedResponse;
      }
    }
    
    // Fetch from network and cache
    const networkResponse = await fetch(request);
    
    if (networkResponse.ok) {
      const responseClone = networkResponse.clone();
      await cache.put(request, responseClone);
      await cleanupCache(cache, strategy.maxEntries);
    }
    
    return networkResponse;
  } catch (error) {
    console.error('Cache first strategy failed:', error);
    
    // Try to return cached version as fallback
    const cache = await caches.open(cacheName);
    const cachedResponse = await cache.match(request);
    
    if (cachedResponse) {
      return cachedResponse;
    }
    
    throw error;
  }
}

/**
 * Network first strategy
 */
async function networkFirst(request, cacheName, strategy) {
  try {
    const networkResponse = await fetch(request);
    
    if (networkResponse.ok) {
      const cache = await caches.open(cacheName);
      const responseClone = networkResponse.clone();
      await cache.put(request, responseClone);
      await cleanupCache(cache, strategy.maxEntries);
    }
    
    return networkResponse;
  } catch (error) {
    console.warn('Network request failed, trying cache:', error);
    
    const cache = await caches.open(cacheName);
    const cachedResponse = await cache.match(request);
    
    if (cachedResponse) {
      return cachedResponse;
    }
    
    throw error;
  }
}

/**
 * Stale while revalidate strategy
 */
async function staleWhileRevalidate(request, cacheName, strategy) {
  const cache = await caches.open(cacheName);
  const cachedResponse = await cache.match(request);
  
  // Start network request (don't await)
  const networkPromise = fetch(request)
    .then(networkResponse => {
      if (networkResponse.ok) {
        const responseClone = networkResponse.clone();
        cache.put(request, responseClone);
        cleanupCache(cache, strategy.maxEntries);
      }
      return networkResponse;
    })
    .catch(error => {
      console.warn('Background fetch failed:', error);
    });
  
  // Return cached response immediately if available
  if (cachedResponse) {
    return cachedResponse;
  }
  
  // If no cache, wait for network
  return networkPromise;
}

/**
 * Get dynamic cache name based on request type
 */
function getDynamicCacheName(request) {
  const url = new URL(request.url);
  const pathname = url.pathname;
  
  if (pathname.match(/\.(jpg|jpeg|png|gif|webp|svg|ico)$/i)) {
    return `${DYNAMIC_CACHE_NAME}-images`;
  }
  
  if (pathname.match(/\.(js|css)$/i)) {
    return `${DYNAMIC_CACHE_NAME}-assets`;
  }
  
  return DYNAMIC_CACHE_NAME;
}

/**
 * Clean up cache to maintain size limits
 */
async function cleanupCache(cache, maxEntries) {
  if (!maxEntries) return;
  
  const keys = await cache.keys();
  
  if (keys.length > maxEntries) {
    const keysToDelete = keys.slice(0, keys.length - maxEntries);
    await Promise.all(
      keysToDelete.map(key => cache.delete(key))
    );
  }
}

/**
 * Handle background sync for offline actions
 */
self.addEventListener('sync', event => {
  if (event.tag === 'background-sync') {
    event.waitUntil(
      // Handle any background sync tasks
      console.log('Background sync triggered')
    );
  }
});

/**
 * Handle push notifications (if needed in the future)
 */
self.addEventListener('push', event => {
  if (event.data) {
    const data = event.data.json();
    
    event.waitUntil(
      self.registration.showNotification(data.title, {
        body: data.body,
        icon: '/images/icon-192x192.png',
        badge: '/images/badge-72x72.png'
      })
    );
  }
});

console.log('Service Worker loaded successfully');
