// TODO: Rename this to window.js and move it to concealer

// Sender
postMessage = new Proxy(postMessage, {
	apply(_target, _that, args) {
		let [data, origin] = args;

		if (origin !== "*") {
			args[1] = "*";

			data.origin = origin;

			args[0] = data;
		}

		console.log(args);

		return Reflect.apply(...arguments);
	},
});

function eventInterceptor(type, listener) {
	if (type === "message" || type === "messageerror")
		return event => {
			if (event instanceof MessageEvent)
				if (event.origin === $aero.proxyLocation.origin) {
					event.origin = $aero.proxyLocation.origin;
					listener(event);
				}
		};
	if (type === "storage") {
		return event => {
			if (event instanceof StorageEvent) {
				event.url = $aero.afterPrefix(url);

				// Ensure the event isn't a clear event
				if (event.key !== null) {
					const proxyKey = $aero.storageKey(event.key);

					if (proxyKey !== null) event.key = proxyKey;
				}
			}
			listener(event);
		};
	}
	if (type === "hashchange") {
		return event => {
			if (event instanceof HashChangeEvent) {
				event.newURL = $aero.afterPrefix(event.newURL);
				event.oldURL = $aero.afterPrefix(event.oldURL);
			}
			listener(event);
		};
	}

	return listener;
}
function setHandler(type) {
	let set;
	Object.defineProperty(window, `on${type}`, {
		set: listener => {
			set = eventInterceptor(type, listener);
		},
		get: () => set,
	});
}

setHandler("message");
setHandler("messageerror");
setHandler("storage");
setHandler("hashchange");

// Reciever concealer
addEventListener = new Proxy(addEventListener, {
	apply(_target, _that, args) {
		args[1] = eventInterceptor(...args);

		return Reflect.apply(...arguments);
	},
});
