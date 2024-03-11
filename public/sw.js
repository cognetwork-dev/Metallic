importScripts("/epoxy/index.js");
importScripts("/ultraviolet/ultraviolet.bundle.js");
importScripts("/ultraviolet/ultraviolet.config.js");
importScripts(__uv$config.sw || "/ultraviolet/ultraviolet.sw.js");
importScripts("/dynamic/dynamic.config.js");
importScripts("/dynamic/dynamic.worker.js");

const sw = new UVServiceWorker();
const dynamic = new Dynamic();

self.dynamic = dynamic;

self.addEventListener("fetch", (event) => {
    if (
        event.request.url.startsWith(location.origin + self.__dynamic$config.prefix)
    ) {
        event.respondWith(
            (async function () {
                if (await dynamic.route(event)) {
                    return await dynamic.fetch(event);
                }

                return await fetch(event.request);
            })()
        );
    } else if (
        event.request.url.startsWith(location.origin + __uv$config.prefix)
    ) {
        event.respondWith(sw.fetch(event));
    }
});