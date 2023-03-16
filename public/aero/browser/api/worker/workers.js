if ($aero.config.nestedWorkers)
	if ("serviceWorker" in navigator) {
		// This api is only exposed in secure contexts
		navigator.serviceWorker.register = new Proxy(
			navigator.serviceWorker.register,
			{
				apply(_target, _that, args) {
					const [path, opts] = args;

					args[0] = `${$aero.rewriteSrc(path)}?mod=${
						opts.type === "module"
					}`;

					console.log(
						`Registering a nested service worker\n${path} ➜ ${args[0]}`
					);

					return Reflect.apply(...arguments);
				},
			}
		);

		const rewriteReg = reg =>
			// Don't let the site see the aero sw
			(reg.active.scriptURL = reg.active.scriptURL.match(
				new RegExp(
					`(?<=${location.origin}${prefix}${$aero.proxyLocation.origin}).*`,
					"g"
				)
			)[0]);

		navigator.serviceWorker.getRegistration = new Proxy(
			navigator.serviceWorker.getRegistration,
			{
				apply: async target =>
					(await target()).map(reg => rewriteReg(reg)),
			}
		);
		navigator.serviceWorker.getRegistrations = new Proxy(
			navigator.serviceWorker.getRegistrations,
			{
				apply: async target => rewriteReg(await target()),
			}
		);
	}
