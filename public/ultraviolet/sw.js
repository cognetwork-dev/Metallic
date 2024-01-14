/*global UVServiceWorker,__uv$config*/
/*
 * Stock service worker script.
 * Users can provide their own sw.js if they need to extend the functionality of the service worker.
 * Ideally, this will be registered under the scope in ultraviolet.config.js so it will not need to be modified.
 * However, if a user changes the location of ultraviolet.bundle.js/ultraviolet.config.js or sw.js is not relative to them, they will need to modify this script locally.
 */
importScripts('ultraviolet.bundle.js');
importScripts('ultraviolet.config.js');
importScripts(__uv$config.sw || 'ultraviolet.sw.js');

const sw = new UVServiceWorker();

self.addEventListener('fetch', (event) => event.respondWith(sw.fetch(event)));
