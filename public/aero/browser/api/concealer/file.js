File = new Proxy(File, {
	get(_that, prop) {
		const ret = Reflect.get(...arguments);

		if (prop === "webkitRelativePath") return $aero.afterPrefix(ret);
		return ret;
	},
});

// TODO: Finish all interecptors for functions that create new files
