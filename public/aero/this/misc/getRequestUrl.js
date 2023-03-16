import { prefix } from "../../config.js";

/**
 * Gets the url that will actually be fetched
 * @param {string} - The origin of the site
 * @param {string} - The origin of the service worker
 * @param {string} - raw url after the proxy prefix
 * @param {string} - path of the site
 * @param {boolean} - the request is for the homepage
 * @param {boolean} - the site is inside of an iFrame
 * @returns {string} The url to proxy
 */
function getRequestUrl(
	origin,
	workerOrigin,
	proxyUrl,
	path,
	isHomepage,
	isIframe
) {
	const noPrefix = path.split(prefix)[1];

	// If it is the first request, there is no need to do any relative url checking
	if (isHomepage) return new URL(noPrefix);

	// Don't hardcode origins
	const absoluteUrl = origin !== workerOrigin;

	if (absoluteUrl) {
		return origin + path;
	} else {
		const proxyOrigin = proxyUrl?.origin;
		const proxyPath = proxyUrl?.pathname;

		if (noPrefix) {
			let retUrl = noPrefix;

			const proxyPathSlashes = proxyPath?.split("/");
			const proxyEndingPath = proxyPathSlashes?.at(-1);

			// Correct relative urls that don't end with a slash; this is an edge case
			if (
				proxyPathSlashes?.at(-2) !== proxyOrigin &&
				proxyEndingPath.length > 0
			) {
				let noPrefixSplit = noPrefix?.split("/");

				noPrefixSplit.splice(
					noPrefixSplit.length - 1,
					0,
					proxyEndingPath
				);
				retUrl = noPrefixSplit.join("/");
			}

			const protoSplit = noPrefix.split("https://");
			const noPrefixProto = protoSplit[1];

			return protoSplit.length > 1 || isIframe
				? retUrl
				: `${proxyOrigin}/${noPrefixProto}`;
		} else return proxyOrigin + path;
	}
}

export default getRequestUrl;
