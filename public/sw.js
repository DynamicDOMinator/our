// Service Worker for Advanced Caching
const CACHE_NAME = 'prosental-cache-v1';
const STATIC_CACHE_NAME = 'prosental-static-v1';
const DYNAMIC_CACHE_NAME = 'prosental-dynamic-v1';

// Assets to cache immediately
const STATIC_ASSETS = [
  '/',
  '/about',
  '/projects',
  '/blogs',
  '/contacts',
  '/Techshun.png',
  '/fav.png',
  '/noisy.gif',
  '/_next/static/css/',
  '/_next/static/js/',
];

// Video and media assets to cache
const MEDIA_ASSETS = [
  '/header.mp4',
  '/about-v.mp4',
  '/short.mp4',
  '/our-1.mp4',
  '/mini1.mp4',
  '/mini2.mp4',
  '/mini3.mp4',
  '/mini4.mp4',
  '/ta2.mp4',
  '/team1.mp4',
  '/team2.webm',
  '/team3.webm',
  '/team4.webm',
  '/team5.webm',
  '/team.jpg',
  '/team1.jpg',
  '/team2.jpg',
  '/team4.jpg'
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
  console.log('Service Worker installing...');
  event.waitUntil(
    Promise.all([
      caches.open(STATIC_CACHE_NAME).then((cache) => {
        console.log('Caching static assets...');
        return cache.addAll(STATIC_ASSETS.filter(asset => asset));
      }),
      caches.open(DYNAMIC_CACHE_NAME).then((cache) => {
        console.log('Pre-caching media assets...');
        // Cache media assets in background
        return Promise.allSettled(
          MEDIA_ASSETS.map(asset => 
            cache.add(asset).catch(err => 
              console.warn(`Failed to cache ${asset}:`, err)
            )
          )
        );
      })
    ]).then(() => {
      console.log('Service Worker installed successfully');
      return self.skipWaiting();
    })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('Service Worker activating...');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== STATIC_CACHE_NAME && 
              cacheName !== DYNAMIC_CACHE_NAME && 
              cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      console.log('Service Worker activated');
      return self.clients.claim();
    })
  );
});

// Fetch event - serve from cache with network fallback
self.addEventListener('fetch', (event) => {
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

  event.respondWith(
    handleFetchRequest(request)
  );
});

async function handleFetchRequest(request) {
  const url = new URL(request.url);
  
  try {
    // Check if it's a static asset
    if (isStaticAsset(url)) {
      return await handleStaticAsset(request);
    }
    
    // Check if it's a media asset
    if (isMediaAsset(url)) {
      return await handleMediaAsset(request);
    }
    
    // Check if it's a page request
    if (isPageRequest(url)) {
      return await handlePageRequest(request);
    }
    
    // For other requests, try network first
    return await handleNetworkFirst(request);
    
  } catch (error) {
    console.warn('Fetch error:', error);
    return new Response('Network error', { status: 503 });
  }
}

// Handle static assets (CSS, JS, images)
async function handleStaticAsset(request) {
  const cachedResponse = await caches.match(request);
  if (cachedResponse) {
    return cachedResponse;
  }
  
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(STATIC_CACHE_NAME);
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    console.warn('Failed to fetch static asset:', request.url);
    return new Response('Asset not available', { status: 404 });
  }
}

// Handle media assets (videos, large images)
async function handleMediaAsset(request) {
  const cachedResponse = await caches.match(request);
  if (cachedResponse) {
    return cachedResponse;
  }
  
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      // Only cache successful responses
      const cache = await caches.open(DYNAMIC_CACHE_NAME);
      // Clone the response before caching
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    console.warn('Failed to fetch media asset:', request.url);
    return new Response('Media not available', { status: 404 });
  }
}

// Handle page requests
async function handlePageRequest(request) {
  try {
    // Try network first for pages to get fresh content
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(DYNAMIC_CACHE_NAME);
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    // Fallback to cache if network fails
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    
    // If no cache, return offline page or error
    return new Response('Page not available offline', { status: 503 });
  }
}

// Handle other requests with network-first strategy
async function handleNetworkFirst(request) {
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(DYNAMIC_CACHE_NAME);
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    const cachedResponse = await caches.match(request);
    return cachedResponse || new Response('Resource not available', { status: 503 });
  }
}

// Helper functions
function isStaticAsset(url) {
  return url.pathname.includes('/_next/static/') ||
         url.pathname.endsWith('.css') ||
         url.pathname.endsWith('.js') ||
         url.pathname.endsWith('.png') ||
         url.pathname.endsWith('.jpg') ||
         url.pathname.endsWith('.jpeg') ||
         url.pathname.endsWith('.gif') ||
         url.pathname.endsWith('.svg') ||
         url.pathname.endsWith('.webp') ||
         url.pathname.endsWith('.avif');
}

function isMediaAsset(url) {
  return url.pathname.endsWith('.mp4') ||
         url.pathname.endsWith('.webm') ||
         url.pathname.endsWith('.mov') ||
         url.pathname.endsWith('.avi');
}

function isPageRequest(url) {
  return url.pathname === '/' ||
         url.pathname.startsWith('/about') ||
         url.pathname.startsWith('/projects') ||
         url.pathname.startsWith('/blogs') ||
         url.pathname.startsWith('/contacts') ||
         (!url.pathname.includes('.') && !url.pathname.includes('_next'));
}

// Background sync for failed requests
self.addEventListener('sync', (event) => {
  if (event.tag === 'background-sync') {
    event.waitUntil(doBackgroundSync());
  }
});

async function doBackgroundSync() {
  console.log('Performing background sync...');
  // Implement background sync logic here if needed
}

// Handle push notifications (if needed in the future)
self.addEventListener('push', (event) => {
  if (event.data) {
    const data = event.data.json();
    const options = {
      body: data.body,
      icon: '/fav.png',
      badge: '/fav.png',
      data: data.data
    };
    
    event.waitUntil(
      self.registration.showNotification(data.title, options)
    );
  }
});

// Handle notification clicks
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  
  event.waitUntil(
    clients.openWindow(event.notification.data?.url || '/')
  );
});