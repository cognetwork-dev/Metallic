self.addEventListener = new Proxy(self.addEventListener, {
	apply(_target, _that, args) {
		const [type, listener] = args;

		if (type === "fetch") {
			function interceptor(event) {
				const reqUrl = event.request.url;
				Object.defineProperty(event.request, "url", {
					get: () => $aero.afterPrefix(reqUrl),
				});

				listener(event);
			}
			if (typeof listener === "function") args[1] = interceptor;
			else if (typeof listener === "string") {
				// TODO: Support strings
				args[1] = `
(${interceptor.toString()})(event);
				`;
			}
		}

		Reflect.apply(...arguments);
	},
});
