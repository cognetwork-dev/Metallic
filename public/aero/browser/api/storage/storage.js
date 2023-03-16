// Local Storage
Storage.prototype.setItem = new Proxy(
	Storage.prototype.setItem,
	$aero.storageNomenclature
);
Storage.prototype.getItem = new Proxy(
	Storage.prototype.getItem,
	$aero.storageNomenclature
);
Storage.prototype.removeItem = new Proxy(
	Storage.prototype.getItem,
	$aero.storageNomenclature
);

Storage.prototype.clear = new Proxy(Storage.prototype.clear, {
	apply(target) {
		for (const key of Object.keys(target))
			if (key.startsWith($aero.storagePrefix)) target.remove(key);
	},
});

Storage.prototype.key = new Proxy(Storage.prototype.key, {
	apply(target, _that, args) {
		const [i] = args;

		let proxyKeys = [];

		for (const key of Object.keys(target))
			if (key.startsWith($aero.storagePrefix))
				proxyKeys.push(
					key.slice(
						str.indexOf($aero.storagePrefix) +
							$aero.storagePrefix.length
					)
				);

		return proxyKeys[i];
	},
});

Storage = new Proxy(Storage, {
	getOwnPropertyDescriptor: () => ({
		enumerable: true,
		configurable: true,
	}),
	ownKeys(target) {
		const keys = Reflect.ownKeys(target);

		return $aero.storageKeys(keys);
	},
});
