import { handle } from "/aero/handle.js";

self.addEventListener("fetch", (event) =>
  event.respondWith(handle(location, event))
);
