/*global StompBoot,__DIP,__uv$config,__osana$config*/

import { bareServerURL } from "./consts";

if ("serviceWorker" in navigator) {
  window.navigator.serviceWorker.register(window.location.origin + "/sw.js");
}

if ("serviceWorker" in navigator) {
  window.navigator.serviceWorker.register(
    window.location.origin + "/uv-sw.js",
    { scope: __uv$config.prefix }
  );
}

if ("serviceWorker" in navigator) {
  window.navigator.serviceWorker.register(
    window.location.origin + "/dip-sw.js",
    { scope: __DIP.config.prefix }
  );
}

navigator.serviceWorker.register(window.location.origin + "/osana/sw.js", {
  scope: __osana$config.prefix,
  updateViaCache: "none",
});

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register(window.location.origin + "/aero-sw.js", {
    scope: "/go/",
    // Don't cache http requests
    updateViaCache: "none",
    type: "module",
  });
}

export var stomp = new StompBoot({
  bare_server: bareServerURL,
  directory: "/stomp/",
  loglevel: StompBoot.LOG_ERROR,
  codec: StompBoot.CODEC_XOR,
});
