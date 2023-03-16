PushSubscription = new Proxy(PushSubscription, {
	get(target, prop) {
		if (prop === "endpoint") return $aero.afterPrefix(target[prop]);
		return Reflect.get(...arguments);
	},
});
