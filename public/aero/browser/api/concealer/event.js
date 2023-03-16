EventSource = new Proxy(EventSource, {
	construct() {
		const ret = Reflect.construct(...arguments);

		ret.url = $aero.afterPrefix(ret.url);
	},
});
