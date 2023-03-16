// Dynamically update location using a function getters
Object.defineProperty($aero, "proxyLocation", {
	get: () => new URL($aero.afterPrefix(location.href)),
});

Object.defineProperty($aero, "upToProxyOrigin", {
	get: () => $aero.config.prefix + $aero.proxyLocation.origin,
});
// Private scope
{
	// Prevent detection by instanceof
	let inheritedObject = {};
	Reflect.setPrototypeOf(inheritedObject, Location.prototype);

	const wrap = url => $aero.config.prefix + url;

	$aero.locationProxy = new Proxy(inheritedObject, {
		get(target, prop) {
			if (typeof target[prop] === "function") {
				const props = {
					toString: $aero.proxyLocation.toString,
					assign: url => location.assign(wrap(url)),
					replace: $aero.proxyLocation.replace,
				};

				return prop in props ? props[prop] : target[prop];
			}

			const fakeUrl = $aero.proxyLocation;

			const customProps = {
				ancestorOrigins: location.ancestorOrigins,
			};

			if (prop in customProps) return customProps[prop];

			if (prop in fakeUrl) return fakeUrl[prop];

			return location[prop];
		},
		set(target, prop, value) {
			if (
				prop === "pathname" ||
				(prop === "href" && value.startsWith("/"))
			)
				target[prop] = $aero.upToProxyOrigin + value;
			else target[prop] = value;
		},
	});
}
