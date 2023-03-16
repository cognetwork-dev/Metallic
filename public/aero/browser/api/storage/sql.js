if ($aero.config.flags.legacy) {
	const handler = {
		apply(_target, _that, args) {
			const [key] = args;

			const newKey = prefix + key;

			args[0] = newKey;

			const dbNames = localStorage.getItem("dbNames") ?? [];
			if (dbNames.includes(newKey))
				localStorage.setItem("dbNames", dbNames.push(newKey));

			return Reflect.apply(...arguments);
		},
	};

	if ("openDatabase" in window)
		openDatabase = new Proxy(openDatabase, handler);
	if ("openDatabaseSync" in window)
		openDatabaseSync = new Proxy(openDatabaseSync, handler);
}
