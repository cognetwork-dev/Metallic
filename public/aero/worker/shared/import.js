// Classic scripts only
if ("importScripts" in self)
	importScripts = new Proxy(importScripts, {
		apply() {
			// TODO: Redirect
			Reflect.apply(...arguments);
		},
	});
