indexedDB.open = new Proxy(indexedDB.open, $aero.storageNomenclature);
indexedDB.deleteDatabase = new Proxy(
	indexedDB.deleteDatabase,
	$aero.storageNomenclature
);
indexedDB.databases = new Proxy(indexedDB.databases, {
	apply() {
		const dbs = Reflect.apply(...arguments);

		dbs.map(db => {
			if (typeof db === "error") return db;

			db.name = prefix + db.name;

			return db;
		});
	},
});
