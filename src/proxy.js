/*global StompBoot,__DIP,__uv$config,__osana$config*/
import { bareServerURL } from "./consts";

export const swSupported = navigator.serviceWorker !== undefined;

if (swSupported) {
  navigator.serviceWorker.register(window.location.origin + "/sw.js");

  navigator.serviceWorker.register(new URL("/uv-sw.js", global.location), {
    scope: __uv$config.prefix,
  });

  navigator.serviceWorker.register(new URL("/dip-sw.js", global.location), {
    scope: __DIP.config.prefix,
  });

  navigator.serviceWorker.register(new URL("/osana/sw.js", global.location), {
    scope: __osana$config.prefix,
    updateViaCache: "none",
  });

  navigator.serviceWorker.register(new URL("/aero-sw.js", global.location), {
    scope: "/go/",
    // Don't cache http requests
    updateViaCache: "none",
    type: "module",
  });
}

export var stomp =
  swSupported &&
  new StompBoot({
    bare_server: bareServerURL,
    directory: "/stomp/",
    loglevel: StompBoot.LOG_ERROR,
    codec: StompBoot.CODEC_XOR,
  });
