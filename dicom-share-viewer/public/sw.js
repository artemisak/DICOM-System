const version = 1;
const staticCacheName = `static-cache-v${version}`;
const fileCacheName = `file-cache-v${version}`;
const dynamicCacheName = `dynamic-cache-v${version}`;

const staticAssets = ['/', '/index.html', '/style.css', '/manifest.json', '/icon.png', '/favicon.ico', '/index.js'];
const filePathNames = ['/file', "/research"];
const dynamicPathNames = ['/file/list', "/research/list", '/discussion/list', '/discussion/comments', '/discussion/accesses'];

const chunkNames = 'dsv-chunk';

self.addEventListener('install', async () => {
    const cache = await caches.open(staticCacheName);
    // await cache.addAll(staticAssets);
    console.log('Service worker has been installed');
});

self.addEventListener('activate', async () => {
    const cachesKeys = await caches.keys();
    const checkKeys = cachesKeys.map(async key => {
        if (![staticCacheName, fileCacheName, dynamicCacheName].includes(key)) {
            await caches.delete(key);
        }
    });
    await Promise.all(checkKeys);
    console.log('Service worker has been activated');
});

self.addEventListener('fetch', event => {
    const {request} = event;
    const {url, method} = request;

    const {pathname, hostname} = new URL(url);

    if (method === 'GET' && hostname === location.hostname) {
        if (filePathNames.includes(pathname)) {
            return event.respondWith(cacheFirst(request, fileCacheName));
        }
        if (dynamicPathNames.includes(pathname)) {
            return event.respondWith(networkFirst(request, dynamicCacheName));
        }
        if (staticAssets.includes(pathname) || pathname?.includes(chunkNames)) {
            return event.respondWith(cacheFirst(request, staticCacheName));
        }
    }

    return event.respondWith(executeRequest(request));
});

async function cacheFirst(request, storageName) {
    const cache = await caches.open(storageName);
    const cachedResponse = await cache.match(request);
    if (cachedResponse) return cachedResponse;
    try {
        const networkResponse = await fetch(request);
        await cache.put(request, networkResponse.clone());
        return networkResponse;
    }
    catch (error) {console.error(`Failed to fetch ${request.url}`)}
}

async function networkFirst(request, storageName) {
    const cache = await caches.open(storageName);
    try {
        const networkResponse = await fetch(request);
        await cache.put(request, networkResponse.clone());
        return networkResponse;
    } catch (e) {
        return cache.match(request)
    }
}

async function executeRequest(req) {
    try {return await fetch(req)}
    catch (error) {console.error(`Failed to fetch ${req.url}`)}
}