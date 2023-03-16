/*
FIXME: Don't use this interface
FileSystemEntry = new Proxy(FileSystemEntry, {
	construct() {
		const ret = target.construct(...arguments);

		const toURL = ret.toURL;
		ret.toURL = () => $aero.afterPrefix(toURL());
	},
});
*/
