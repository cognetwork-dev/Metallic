var cacheName = "metallic";
var filesToCache = ["/sw.js"];

self.addEventListener("install", function (e) {
  e.waitUntil(
    caches.open(cacheName).then(function (cache) {
      return cache.addAll(filesToCache);
    })
  );
  self.skipWaiting();
});

async function handleRequest(fetchPath) {
  var CDN = "https://raw.githubusercontent.com/3kh0/3kh0-Assets/main"

  fetchPath = CDN + "/" + fetchPath;

  if (!fetchPath.endsWith(".html") && !fetchPath.endsWith(".css") && !fetchPath.endsWith(".js")) {
    try {
      return await fetch(fetchPath);
    } catch (error) {
      console.error(`Fetch request for ${fetchPath} failed with error: ${error}`);
    }
  }

  try {
    var customFetch = await fetch(fetchPath);
    var htmlCode = await customFetch.text();

    var newHeaders = Object.assign({}, customFetch.rawHeaders);

    if (fetchPath.endsWith(".html")) {
      newHeaders["content-type"] = "text/html";
    } else if (fetchPath.endsWith(".css")) {
      newHeaders["content-type"] = "text/css";
    } else if (fetchPath.endsWith(".js")) {
      newHeaders["content-type"] = "text/javascript";
    }

    return new Response(htmlCode, {
      status: customFetch.status,
      headers: newHeaders,
    });
  } catch (error) {
    console.error(`Fetch request for ${fetchPath} failed with error: ${error}`);
  }
}

self.addEventListener("fetch", function (e) {
  var path = new URL(e.request.url).pathname;

  if (path.startsWith("/files/")) {
    var fetchPath = path.split("/files/")[1];

    return e.respondWith(handleRequest(fetchPath));
  } else {
    return e.respondWith(
      caches.match(e.request).then(function (response) {
        return response || fetch(e.request);
      })
    );
  }
});
