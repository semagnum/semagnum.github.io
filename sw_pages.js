const cacheName = 'v1'; //Cache version name

const cacheAssets = [ // list of files to cache
    'index.html',
    'index.css',

    'qr/index.html',
    'qr/qr.png',

    'assets/bcon.png',
    'assets/bio.png',
    'assets/blendermarketlogo.png',
    'assets/extensions.png',
    'assets/magnusson-192.png',
    'assets/pixelfed-icon.png',
    'assets/utility-course-badge.png',

    'base.css',
    'favicon.ico',
];


self.addEventListener('install', e => {
    console.log('Service Worker: Installed');
    e.waitUntil(
        caches
            .open(cacheName)
            .then(cache => {
                console.log('Service Worker: Caching Files');
                cache.addAll(cacheAssets);
            })
            .then(() => self.skipWaiting())
    );
});


self.addEventListener('activate', e => {
    console.log('Service Worker: Activated');
    e.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    if (cache !== cacheName) {
                        console.log('Service Worker: Clearing Old Cache');
                        return caches.delete(cache);
                    }
                })
            )
        })
    );
});


self.addEventListener('fetch', e => {
    console.log('Service Worker: Fetching');
    e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
});