if ("serviceWorker" in navigator && "index" in ServiceWorkerRegistration) {
	ServiceWorkerRegistration.index.add = new Proxy({
		apply(_target, _that, args) {
			[url] = args;

			args[0] = $aero.rewriteSrc(url);

			return Reflect.apply(...argument);
		},
	});

	ServiceWorkerRegistration.index.getAll = new Proxy({
		apply() {
			const ret = Reflect.target(...arguments);

			for (const desc of ret) desc.url = $aero.afterPrefix(desc.url);

			return ret;
		},
	});
}
