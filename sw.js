const CACHE_NAME = 'player-static-v1';
const STATIC_ASSETS = [
  './',
  './index.php',
  './style.css',
  './player.js',
  './manifest.webmanifest',
  './assets/vendor/bootstrap/css/bootstrap.rtl.min.css',
  './assets/vendor/bootstrap/js/bootstrap.bundle.min.js',
  './assets/vendor/fontawesome/css/all.min.css',
  './assets/vendor/fonts/vazirmatn.css'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(STATIC_ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const request = event.request;
  if (request.method !== 'GET') {
    return;
  }

  const requestUrl = new URL(request.url);
  if (requestUrl.origin !== self.location.origin) {
    return;
  }

  event.respondWith(
    caches.match(request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }

      return fetch(request)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const responseClone = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(request, responseClone));
          }
          return networkResponse;
        })
        .catch(() => {
          if (request.mode === 'navigate') {
            return caches.match('./index.php');
          }
          return new Response('', { status: 504, statusText: 'Offline' });
        });
    })
  );
});
