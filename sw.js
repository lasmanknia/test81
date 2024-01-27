const CACHE_NAME = 'offline-cache';
const OFFLINE_URL = 'index.html';

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                return cache.add(OFFLINE_URL);
            })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(OFFLINE_URL)
            .then((response) => {
                return response || fetch(event.request);
            })
    );
});

self.addEventListener('activate', (event) => {
    const cacheWhitelist = [CACHE_NAME];

    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((name) => {
                    if (cacheWhitelist.indexOf(name) === -1) {
                        return caches.delete(name);
                    }
                })
            );
        })
    );
});
