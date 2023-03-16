if ("Presentation" in window) {
	PresentationRequest = new Proxy(PresentationRequest, {
		construct(_that, args) {
			// Could either be a string or an array
			let [urls] = args;

			if (Array.isArray(urls))
				urls = urls.map(url => $aero.rewriteSrc(url));
			else urls = $aero.rewriteSrc(urls);

			args[0] = urls;

			return Reflect.construct(...arguments);
		},
	});
	PresentationConnnection = new Proxy(PresentationConnection, {
		get(target, prop) {
			if (prop === "url") return $aero.afterPrefix(target.url);

			return Reflect.get(...arguments);
		},
	});
}
