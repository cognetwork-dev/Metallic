// Rewriters
import { rewriteSetCookie } from "../../shared/cookie.js";

const ignoredHeaders = [
	"cache-control",
	"clear-site-data",
	"content-encoding",
	"content-length",
	"cross-origin-opener-policy",
	"cross-origin-opener-policy-report-only",
	"report-to",
	"strict-transport-security",
	"x-content-type-options",
	"x-frame-options",
];

/**
 * Rewrites the location header
 * @param {object} - The url
 * @return {string} - The url pointed to the proxified url
 */
function rewriteLocation(url) {
	return self.location.origin + prefix + url;
}

/**
 * Rewrites the response headers
 * @param {object}
 * @return {string} The rewritten headers
 */
export default (corsEmulation, headers) => {
	const rewrittenHeaders = {};

	Object.keys(headers).forEach(key => {
		function set(val) {
			rewrittenHeaders[key] = val;
		}

		if (
			ignoredHeaders.includes(key) ||
			(!corsEmulation && key === "content-security-policy")
		) {
			return;
		}

		const value = headers[key];

		if (key === "location") set(rewriteLocation(value));
		else if (key === "cookie") set(rewriteGetCookie(value));
		else if (key === "set-cookie") set(rewriteSetCookie(value));
		else set(value);
	});

	return rewrittenHeaders;
};
