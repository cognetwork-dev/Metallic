open = new Proxy(open, {
	apply(_target, _that, args) {
		const [url] = args;

		args[0] = $aero.rewriteSrc(url);

		return Reflect.apply(...arguments);
	},
});
