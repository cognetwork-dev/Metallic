// Conceal the rewritten headers

fetch = new Proxy(fetch, {
	apply() {
		const ret = Reflect.target(...arguments);

		ret.headers = new Headers(ret.headers.get("x-aero-headers"));

		return ret;
	},
});

XMLHttpRequest.prototype.getResponseHeader = new Proxy(
	XMLHttpRequest.prototype.getResponseHeader,
	{
		apply(target, that, args) {
			[name] = args;

			return JSON.parse(target("x-aero-headers"))[name];
		},
	}
);
XMLHttpRequest.prototype.getResponseHeader = new Proxy(
	XMLHttpRequest.prototype.getResponseHeader,
	{
		apply(target, that, args) {
			let ret = "";

			// CRLF
			for (const [key, value] of Object.entries(
				JSON.parse(target("x-aero-headers"))
			))
				ret += `${key}: ${value}\r\n`;

			return ret;
		},
	}
);
