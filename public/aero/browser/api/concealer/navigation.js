if (
	// Not finished
	$aero.config.flags.misc &&
	// Only supported on Chromium
	"navigation" in window
) {
	Object.defineProperty($aero, "navigationEntry", {
		get: () => $aero.proxyLocation.href,
	});

	// Entries
	navigation.currentEntry.url = $aero.navigationEntry;
	navigation.entries = new Proxy(navigation.entries, {
		apply() {
			const entries = Reflect.apply(...arguments);

			// We may delete some entries, so we will update the index with the new index
			let i = 0;

			/** @const {string[]} */
			const newEntries = [];

			for (let entry of entries) {
				const newEntry = entry;

				// The original property is a getter property, as the value will be changed dynamically
				const tempBak = entry.url;
				Object.defineProperty(newEntry, "url", {
					get: () => tempBak.replace($aero.afterPrefix, ""),
				});

				try {
					if (
						new URL(newEntry.url).origin !==
						$aero.proxyLocation.origin
					)
						// The site is not supposed to see this entry
						continue;
				} catch {
					continue;
				}

				Object.defineProperty(newEntry, "index", {
					value: i++,
				});

				newEntries.push(newEntry);
			}

			return entries;
		},
	});

	if (navigation.transition)
		navigation.transition.from = $aero.navigationEntry;

	navigation.addEventListener = new Proxy(navigation.addEventListener, {
		apply(_target, _that, args) {
			const [type, listener] = args;

			if (type === "currententrychange")
				args[1] = event => {
					if (event instanceof NavigationCurrentEntryChangeEvent)
						event.from.url = $aero.afterPrefix(event.from.url);

					listener(event);
				};

			return Reflect.apply(...arguments);
		},
	});
}
