import { debug } from "../../config.js";

import headersToObject from "./headersToObject.js";

/**
 * A wrapper for Fetch that routes all requests through the proxy backend
 * @constructor
 * @param {string} - The backends to try
 */
export default class {
	constructor(backends) {
		this.backends = backends;
	}
	async fetch(url, opts) {
		let ret = {
			method: opts && "method" in opts ? opts.method : "GET",
			headers: {
				"x-url": url,
				"x-headers": "{}",
			},
		};

		if (typeof opts !== "undefined") {
			if ("body" in opts) ret.body = opts.body;
			if ("headers" in opts)
				ret.headers["x-headers"] = JSON.stringify(
					typeof opts.headers === "object"
						? opts.headers
						: headersToObject(opts.headers)
				);
		}

		let resp;

		for (const backend of this.backends)
			try {
				// Make the request to the proxy
				const attempt = await fetch(backend, ret);

				// An available backend has been found
				resp = attempt;
				break;
			} catch (err) {
				if (debug.errors && err.name === "NetworkError")
					console.warn(
						backend.startsWith("/")
							? "The main backend is down"
							: `Backend ${new URL(backend).hostname} is down`
					);
			}

		if (!resp)
			return new Error(
				"Can't find any available backends. You may be offline."
			);
		return resp;
	}
}
