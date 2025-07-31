// Service Worker Registration Utility

export const registerServiceWorker = async () => {
  if (typeof window === 'undefined' || !('serviceWorker' in navigator)) {
    console.log('Service Worker not supported');
    return false;
  }

  try {
    console.log('Registering Service Worker...');
    const registration = await navigator.serviceWorker.register('/sw.js', {
      scope: '/'
    });

    console.log('Service Worker registered successfully:', registration);

    // Handle updates
    registration.addEventListener('updatefound', () => {
      const newWorker = registration.installing;
      if (newWorker) {
        newWorker.addEventListener('statechange', () => {
          if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
            console.log('New Service Worker available');
            // Optionally notify user about update
            if (window.confirm('New version available. Reload to update?')) {
              window.location.reload();
            }
          }
        });
      }
    });

    // Listen for messages from service worker
    navigator.serviceWorker.addEventListener('message', (event) => {
      console.log('Message from Service Worker:', event.data);
    });

    return registration;
  } catch (error) {
    console.error('Service Worker registration failed:', error);
    return false;
  }
};

export const unregisterServiceWorker = async () => {
  if (typeof window === 'undefined' || !('serviceWorker' in navigator)) {
    return false;
  }

  try {
    const registration = await navigator.serviceWorker.getRegistration();
    if (registration) {
      const result = await registration.unregister();
      console.log('Service Worker unregistered:', result);
      return result;
    }
    return false;
  } catch (error) {
    console.error('Service Worker unregistration failed:', error);
    return false;
  }
};

export const checkServiceWorkerUpdate = async () => {
  if (typeof window === 'undefined' || !('serviceWorker' in navigator)) {
    return false;
  }

  try {
    const registration = await navigator.serviceWorker.getRegistration();
    if (registration) {
      await registration.update();
      console.log('Service Worker update check completed');
      return true;
    }
    return false;
  } catch (error) {
    console.error('Service Worker update check failed:', error);
    return false;
  }
};

export const getServiceWorkerStatus = async () => {
  if (typeof window === 'undefined' || !('serviceWorker' in navigator)) {
    return { supported: false, registered: false, active: false };
  }

  try {
    const registration = await navigator.serviceWorker.getRegistration();
    return {
      supported: true,
      registered: !!registration,
      active: !!registration?.active,
      installing: !!registration?.installing,
      waiting: !!registration?.waiting
    };
  } catch (error) {
    console.error('Failed to get Service Worker status:', error);
    return { supported: true, registered: false, active: false, error: error.message };
  }
};

// Cache management utilities
export const clearAllCaches = async () => {
  if (typeof window === 'undefined' || !('caches' in window)) {
    return false;
  }

  try {
    const cacheNames = await caches.keys();
    const deletePromises = cacheNames.map(cacheName => caches.delete(cacheName));
    await Promise.all(deletePromises);
    console.log('All caches cleared');
    return true;
  } catch (error) {
    console.error('Failed to clear caches:', error);
    return false;
  }
};

export const getCacheInfo = async () => {
  if (typeof window === 'undefined' || !('caches' in window)) {
    return { supported: false, caches: [] };
  }

  try {
    const cacheNames = await caches.keys();
    const cacheInfo = await Promise.all(
      cacheNames.map(async (name) => {
        const cache = await caches.open(name);
        const keys = await cache.keys();
        return {
          name,
          size: keys.length,
          urls: keys.map(request => request.url)
        };
      })
    );
    
    return {
      supported: true,
      caches: cacheInfo,
      totalCaches: cacheNames.length,
      totalCachedItems: cacheInfo.reduce((sum, cache) => sum + cache.size, 0)
    };
  } catch (error) {
    console.error('Failed to get cache info:', error);
    return { supported: true, caches: [], error: error.message };
  }
};

// Preload critical resources
export const preloadCriticalResources = async (resources) => {
  if (typeof window === 'undefined' || !('caches' in window)) {
    return false;
  }

  try {
    const cache = await caches.open('critical-resources');
    const preloadPromises = resources.map(async (resource) => {
      try {
        const response = await fetch(resource);
        if (response.ok) {
          await cache.put(resource, response);
          console.log(`Preloaded: ${resource}`);
        }
      } catch (error) {
        console.warn(`Failed to preload: ${resource}`, error);
      }
    });
    
    await Promise.allSettled(preloadPromises);
    return true;
  } catch (error) {
    console.error('Failed to preload critical resources:', error);
    return false;
  }
};