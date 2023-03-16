// Rewriters
import { rewriteGetCookie } from "../../shared/cookie.js";

/**
 * Rewrites the response headers
 * @param {object}
 * @param {string}
 * @param {RegExp}
 * @return {string} The rewritten headers
 */
export default (headers, proxyUrl, afterPrefix) => {
	const rewrittenHeaders = {};

	Object.keys(headers).forEach(key => {
		function set(val) {
			rewrittenHeaders[key] = val;
		}

		const value = headers[key];

		if (key === "host") set(proxyUrl?.host);
		else if (key === "origin") set(proxyUrl?.origin);
		else if (key === "referrer") set(afterPrefix(value));
		else if (key === "cookie") set(rewriteGetCookie(value));
		else if (!key.startsWith("x-aero")) set(value);
	});

	return rewrittenHeaders;
};
