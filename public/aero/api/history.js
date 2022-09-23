// Incomplete

var historyState = {
	apply(target, that, args) {
		let [state, title, url = ''] = args;

		return Reflect.apply(...arguments);
	}
};

history.pushState = new Proxy(history.pushState, historyState);
history.replaceState = new Proxy(history.replaceState, historyState);