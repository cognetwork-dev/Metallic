Navigator.prototype.sendBeacon = new Proxy(Navigator.prototype.sendBeacon, {
	apply(_target, _that, args) {
		const [url] = args;

		args[0] = $aero.rewriteSrc(url);

		return Reflect.apply(...arguments);
	},
});

// Sandbox data to their respective origin
{
	const protoHandler = {
		apply(_target, _that, args) {
			const [scheme, url] = args;

			args[0] = $aero.proto.set(scheme);
			args[1] = $aero.rewriteSrc(url);

			return Reflect.apply(...arguments);
		},
	};

	navigator.registerProtocolHandler = new Proxy(
		navigator.registerProtocolHandler,
		protoHandler
	);
	navigator.unregisterProtocolHandler = new Proxy(
		navigator.unregisterProtocolHandler,
		protoHandler
	);
}
{
	const key = "aero.badges";

	let badges = localStorage.getItem(key) ?? [];

	let badge;

	const found = badges.find(
		badge => badge.origin === $aero.proxyLocation.origin,
		(_el, i) => {
			badge = badges[i];
		}
	);

	if (!found) {
		badge = {
			origin: $aero.proxyLocation.origin,
			i: 0,
		};

		badges.push(badge);
	}

	const setBak = Navigator.setAppBadge;

	function getTotal() {
		let i = 0;

		for (const badge of badges) i += badge.i;

		return i;
	}
	function updateCount() {
		badges.find(
			badge => badge.origin === $aero.proxyLocation.origin,
			(_el, i) => {
				// Local
				badges[i] = badge;
				// Update
				setBak(getTotal());
				// Save
				localStorage.setItem(key, badge);
			}
		);
	}

	navigator.setAppBadge = new Proxy(navigator.clearAppBadge, {
		apply(_target, _that, args) {
			[contents] = args;

			badge.i = contents;

			updateCount();
		},
	});
	navigator.clearAppBadge = new Proxy(navigator.clearAppBadge, {
		apply() {
			badge.i = 0;

			updateCount();
		},
	});
}
