
// Check for browser support of service worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('mysw.js')
    .then(function(registration) {
      // Successful registration
      console.log('Hooray. Registration successful, scope is:', registration.scope);
    }).catch(function(err) {
    // Failed registration, service worker won’t be installed
    console.log('Whoops. Service worker registration failed, error:', error);
  });
}

var CACHE_NAME = 'my-pwa-cache-v1';
var urlsToCache = [
  '/',
  '/index.html',
  '/js/main.js'
];
self.addEventListener('install', function(event) {
  console.log("in install event")
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        // Open a cache and cache our files
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('activate', function(event){
  console.log('activated!');
});

self.addEventListener('fetch', function(event) {
  console.log("in fetch event")
  console.log(event.request.url);
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
});

self.addEventListener('message', function(event){
  console.log("SW Received Message1: " + event.data);
  setInterval(() => event.ports[0].postMessage("returned from sw"), 1000)
  ;

});