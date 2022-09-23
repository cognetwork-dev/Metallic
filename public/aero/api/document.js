// Incomplete

Object.defineProperty(document, 'domain', {
	get() {
		return fakeLocation.hostname;
	},
	set(value) {
		return value;
	}
});