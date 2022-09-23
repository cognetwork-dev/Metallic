// Incomplete

open = new Proxy(open, {
	apply(target, that, args) {
		if (args[0])
			args[0] = wrap(args[0]);

		return Reflect.apply(...arguments);
	}
});