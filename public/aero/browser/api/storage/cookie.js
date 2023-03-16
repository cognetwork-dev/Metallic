if ($aero.config.flags.experimental && "cookieStore" in window) {
	function getOriginalCookie(cookie) {
		// Not done
		return cookie;
	}

	cookieStore.set = new Proxy(cookieStore.set, {
		apply(_target, _that, args) {
			const [cookie] = args;

			cookie.domain = location.domain;
			cookie.path = locationUpToProxyOrigin + cookie.path;

			args[0] = cookie;

			return Reflect.apply(...arguments);
		},
	});
	cookieStore.get = new Proxy(cookieStore.set, {
		apply() {
			return getOriginalCookie(
				$aero.config.prefix,
				Reflect.apply(...arguments)
			);
		},
	});

	cookieStore.addEventListener = new Proxy(cookieStore.addEventListener, {
		apply(_target, _that, args) {
			const [type, listener] = args;

			if (type === "change")
				args[1] = event => {
					if (event instanceof CookieChangeEvent) {
						/*
						TODO: Rewrite
						event.changed
						event.deleted
						*/
					}

					event.listener(event);
				};

			return Reflect.apply(...arguments);
		},
	});
}

$aero.cookie = document.cookie;
Object.defineProperty(document, "cookie", {
	get: () => $aero.rewriteGetCookie($aero.cookie),
	set: value => ($aero.cookie = $aero.rewriteSetCookie(value)),
});
