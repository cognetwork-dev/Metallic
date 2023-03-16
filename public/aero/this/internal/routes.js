export default {
	// Used by both the inject code and this service worker
	shared: ["cookie", "scope", "src"],
	"browser/misc": [
		"escape",
		"proto",
		"storage",
		// CORS Emulation
		"frame",
		"perms",
		"clear",
	],
	"browser/rewriters": ["cors", "csp", "cspSrc", "cloner", "htmlSrc", "html"],
	// Hide the true origin
	"browser/api/concealer": [
		"css",
		"element",
		"error",
		"event",
		"file",
		"fs",
		"http",
		"manifest",
		"navigation",
		"payment",
		"presentation",
		"push",
		"reporting",
		"scoping",
		"timing",
		"xml",
	],
	"browser/api/event": ["messages"],
	"browser/api/loc": [
		"contentIndex",
		"history",
		"location",
		"navigator",
		"popup",
	],
	// Alt protocols
	"browser/api/req": ["http", "ws", "wrtc"],
	"browser/api/storage": ["cookie", "idb", "sql", "storage"],
	"browser/api/worker": ["workers"],
	/*
	Miscellaneous injected code
	Don't put anything after dom
	*/
	"browser/injects": ["dom"],
};
