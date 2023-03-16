/*
There are 2 ways to detect proxies using the Performance API
If the site was rewritten or the headers were modified, the size would be different than what is intended. You can think of this as a form of hash checking
If you make a request to two different proxy origins on the site that are both cached and one has the Clear-Site-Data clearing both proxy origins, the proxy can be detected
*/
{
	const info = new Map();

	const broadcast = new BroadcastChannel("resCached");

	// Detect if cache is cached
	// TODO: Broadcast this info on the sw
	broadcast.onmessage = event => {
		const { url, cached } = event.data.payload;

		resInfo.add(url, cached);
	};

	function isCached(url) {
		return url in info.get(url);
	}

	async function getHeader(name) {
		const resp = await fetch(url);

		return resp.headers[name];
	}

	async function getBodySize(url) {
		return await getHeader(url, "x-aero-size-body");
	}

	PerformanceResourceTiming = new Proxy(PerformanceResourceTiming, {
		async get(target, prop) {
			const url = target.name;
			const size = target[prop];

			const resCached = isCached(url);
			const resCrossOrigin = url.startsWith($aero.upToProxyOrigin);
			const isZero =
				resCached || resCrossOrigin || "timing" in $aero.cors.headers;

			// These represent the size of the response
			if (prop === "transferSize") {
				if (isZero) return 0;

				return await getHeader(url, "x-aero-size-transfer");
			}
			if (prop === "encodedBodySize") {
				if (isZero) return 0;

				const decodeSize = prop.decodedBodySize;

				// There is no encoding
				if (size === decodeSize) return await getBodySize(url);
				else return await getHeader(url, "x-aero-size-encbody");
			}
			if (prop === "decodedBodySize") {
				if (isZero) return 0;

				return await getBodySize(url);
			}
			return Reflect.get(...arguments);
		},
	});
}
