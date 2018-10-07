// Service worker installation and caching
self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open('version1').then(function(cache) {
            return cache.addAll([
                '/',
                '/index.html',
                '/restaurant.html',
                '/css/styles.css',
                '/js/main.js',
                '/js/restaurant_info.js',
                '/js/dbhelper.js',
                '/data/restaurants.json',
                '/img/1.jpg',
                '/img/2.jpg',
                '/img/3.jpg',
                '/img/4.jpg',
                '/img/5.jpg',
                '/img/6.jpg',
                '/img/7.jpg',
                '/img/8.jpg',
                '/img/9.jpg',
                '/img/10.jpg'  
            ]);
        })
    );
});

//Service worker fetching
self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request).then(function(response) {
            if (response) {
                return response;
            } else {
                return fetch(event.request).then(function(response) {
                    let responseClone = response.clone();
                    caches.open('version1').then(function(cache) {
                        cache.put(event.request, responseClone);
                    })
                    return response;
                }).catch(function(err) {
                    console.log('Cache Entry Error');
                });
            }
        })
    );
});
