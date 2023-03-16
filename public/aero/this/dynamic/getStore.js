// A safe astraction to get the actual config store that aero needs
export default (dbName, func) => {
	const req = indexedDB.open(dbName);

	req.onsuccess = () => {
		const db = req.result;

		// Error here
		const transaction = db.transaction("config", "readwrite");

		transaction.oncomplete = () => {
			const store = transaction.objectStore("config");

			if (store instanceof IDBOpenDBRequest) func(store);
			else console.error(`Unable to get store for config`);
		};
	};

	req.onerror = event => {
		console.error(
			`Error initializing the db for dynamic config updates\n${event.target.errorCode}`
		);
	};
};
