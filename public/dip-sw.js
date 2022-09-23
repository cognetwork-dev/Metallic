importScripts("/dip/dip.worker.js");
importScripts("/dip/dip.config.js");
var DIP = new DIPServiceWorker("/dip/dip.config.js");

self.addEventListener("fetch", (event) => {
  if (event.request.url.startsWith(location.origin + self.__DIP.config.prefix))
    return event.respondWith(DIP.fetch(event));
});
