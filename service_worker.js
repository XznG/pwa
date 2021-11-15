// service worker js in root directory only can handle any js below or same directory with it
const cacheName = "cache_v2";
const cacheAssets = [
  'index.html',
  'css/styles.css',
  'js/index.js',
  'lib/bootstrap.min.css',
  'manifest.webmanifest',
];
// call install event
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
// call activate event
self.addEventListener('activate', e => {
  console.log('Service Worker: Activated');
  // remove unwanted caches
  e.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if(cache !== cacheName){
            console.log(`Service Worker: Clearing Old Cache [${cache}]`);
            return caches.delete(cache);
          }//end if
        })
      )
    })
  )
})

// call fetch event
self.addEventListener('fetch', e => {
  console.log('Service Worker: Fetching');
  e.respondWith(
    // fetch(e.request).catch(() => caches.match(e.request))
    fetch(e.request)
      .then(res => {
        console.log(e.request);
        // make copy of response
        const resClone = res.clone();
        // open cache
        caches.open(cacheName)
          .then(cache => {
            // check the request is from http or not
            if(e.request.url.startsWith('http')){
              // add the response to the cache
              cache.put(e.request, resClone);
            }
          });
        return res;
      })
      .catch(err => {
        caches.match(e.request)
          .then(res => res)
      })
  );
})
function openPushNotification(event) {
  count++;
  console.log(count);
  // event.notification.close();
  // event.waitUntil(clients.openWindow(event.notification.data));
}

self.addEventListener("notificationclick", openPushNotification);
var count = 0;
