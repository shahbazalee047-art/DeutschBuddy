const CACHE_VERSION = 'deutschbuddy-v18';
const STATIC_CACHE = `${CACHE_VERSION}-static`;
const API_CACHE = `${CACHE_VERSION}-api`;
const FONT_CACHE = `${CACHE_VERSION}-fonts`;

const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/buddy-icon-192.png',
  '/buddy-icon-512.png',
  // Buddy mascot — used on home, lessons, tutorial, review. Precache so the
  // mascot renders offline on first use after install.
  '/buddy/buddy-square-512.webp',
  '/buddy/buddy-happy.webp',
  '/buddy/buddy-celebrate.webp',
  '/buddy/buddy-thinking.webp',
  '/buddy/buddy-sad.webp',
  '/buddy/buddy-waving.webp'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE).then((cache) => cache.addAll(STATIC_ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.filter((key) => !key.startsWith(CACHE_VERSION)).map((key) => caches.delete(key))
      )
    ).then(() => self.clients.claim())
  );
});

function isStaticAsset(url) {
  return url.pathname.startsWith('/assets/') ||
    url.pathname.startsWith('/buddy/') ||
    url.pathname.endsWith('.js') ||
    url.pathname.endsWith('.css') ||
    url.pathname.endsWith('.svg') ||
    url.pathname.endsWith('.png') ||
    url.pathname.endsWith('.webp') ||
    url.pathname.endsWith('.json');
}

function isFont(url) {
  return url.hostname.includes('fonts.gstatic.com') || url.hostname.includes('fonts.googleapis.com');
}

function isApi(url) {
  return url.pathname.startsWith('/api/') ||
    url.pathname.startsWith('/rest/v1/') ||
    url.pathname.startsWith('/auth/v1/');
}

// Stale-while-revalidate for static assets
async function staleWhileRevalidate(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);

  const fetchPromise = fetch(request)
    .then((networkResponse) => {
      if (networkResponse && networkResponse.ok) {
        cache.put(request, networkResponse.clone());
      }
      return networkResponse;
    })
    .catch(() => cached);

  return cached || fetchPromise;
}

// Network-first for API calls, fallback to cache
async function networkFirst(request, cacheName) {
  const cache = await caches.open(cacheName);
  try {
    const networkResponse = await fetch(request);
    if (networkResponse && networkResponse.ok) {
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (err) {
    const cached = await cache.match(request);
    if (cached) return cached;
    throw err;
  }
}

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  const url = new URL(event.request.url);

  // Skip cross-origin except Google Fonts
  if (url.origin !== self.location.origin && !isFont(url)) return;

  if (isFont(url)) {
    event.respondWith(staleWhileRevalidate(event.request, FONT_CACHE));
    return;
  }

  if (isStaticAsset(url)) {
    event.respondWith(staleWhileRevalidate(event.request, STATIC_CACHE));
    return;
  }

  if (isApi(url)) {
    event.respondWith(networkFirst(event.request, API_CACHE));
    return;
  }

  // HTML navigation: network-first, fallback to cached index.html
  event.respondWith(
    fetch(event.request)
      .then((res) => {
        if (res && res.ok) {
          const clone = res.clone();
          caches.open(STATIC_CACHE).then((cache) => cache.put(event.request, clone));
        }
        return res;
      })
      .catch(() => caches.match(event.request).then((cached) => cached || caches.match('/index.html')))
  );
});

self.addEventListener('controllerchange', () => {
  self.clients.matchAll().then((clients) => {
    clients.forEach((client) => client.postMessage({ type: 'SW_UPDATED' }));
  });
});
