if ("launchQueue" in window)
	launchQueue.setConsumer = new Proxy(launchQueue.setConsumer, {
		apply(_target, _that, args) {
			[callback] = args;

			return params => {
				params.targetUrl = $aero.afterPrefix(params.targetUrl);

				callback(params);
			};
		},
	});
