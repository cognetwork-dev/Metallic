import handle from "./aero/handle.js";
import "./aero/init.js";

self.addEventListener("install", () => self.skipWaiting());

self.addEventListener("fetch", async event =>
	event.respondWith(
		handle(event).catch(err => new Response(err.stack, { status: 500 }))
	)
);