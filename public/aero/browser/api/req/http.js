fetch = new Proxy(fetch, {
	apply(_target, _that, args) {
		[opts] = args;

		if (
			opts.cache &&
			// only-if-cached requires the mode to be same origin
			!(opts.mode !== "same-origin" && opts.cache === "only-if-cached")
		)
			// Emulate cache mode
			args[1].headers.add("x-aero-cache", opts.cache);

		return Reflect.apply(...arguments);
	},
});
