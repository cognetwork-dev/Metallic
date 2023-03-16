// Emulates the Clear Site Data header

if ($aero.config.flags.nonstandard)
	navigator.serviceWorker.addEventListener("message", event => {
		if (event.data === "clearExecutionContext") location.reload();
	});

// Private scope
{
	if ($aero.cors.clear) {
		const clear = JSON.parse($aero.cors.clear);

		const all = clear.includes("'*'");

		if (all || clear.includes("'cookies'")) {
			function clearCookies(path) {
				const cookies = document.cookie.split(";");

				for (const cookie of cookies) {
					const eqPos = cookie.indexOf("=");

					const name =
						eqPos > -1 ? cookie.substring(0, eqPos) : cookie;

					document.cookie =
						name +
						"=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=" +
						path +
						";";
				}
			}
			clearCookies($aero.upToProxyOrigin);
		}

		// Storage
		if (all || clear.includes("'storage'")) {
			// iDB
			indexedDB.databases().then(({ name }) => {
				if (name.startsWith($aero.storageNomenclature))
					indexedDB.deleteDatabase(name);
			});

			// Storage
			function clearStore(name) {
				if (name in window) {
					const storage = window[name];

					if (storage instanceof Storage) {
						for (let [key] of Object.entries(storage))
							if (key.startsWith($aero.storageNomenclature))
								storage.removeItem(key);
					}
				}
			}
			clearStore("localStorage");
			clearStore("sessionStorage");

			// WebDatabase
			if ($aero.config.flags.legacy && "openDatabase" in window) {
				for (const name of localStorage.getItem("dbNames")) {
					openDatabase(name).transaction(tx => {
						tx.executeSql(
							'SELECT name FROM sqlite_master WHERE type="table"',
							[],
							(tx, data) => {
								for (let i = 0; i < data.rows.length; i++) {
									const name = data.rows.item(i).name;

									if (name !== "__WebKitDatabaseInfoTable__")
										tx.executeSql(
											`DELETE FROM ${tableName}`
										);
								}
							}
						);
					});
				}
			}

			// TODO: Clear all filesystem data

			// Service Workers
			navigator.serviceWorker.getRegistrations().then(regs => {
				for (const reg of regs) {
					if (reg.scope.startsWith($aero.upToProxyOrigin))
						reg.unregister();
				}
			});
		}
	}
}
