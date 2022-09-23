// Incomplete

function wrap(url) {
	return prefix + url;
}

let fakeLocation = new URL(location.href.match(/(?<=\/go\/).*/g)[0]);

const locationProxy = new Proxy({}, {
	get(target, prop) {
		if (typeof target[prop] === 'function')
			return {
				assign: url => wrap(url),
				toString: url => fakeLocation.toString(),
				reload: location.reload
			}[prop];
		return fakeLocation[prop];
	},
	set(target, prop, value) {
		if (prop === 'href')
			location[prop] = config.http.prefix + fakeLocation.origin + value;
	}
});

document._location = locationProxy;