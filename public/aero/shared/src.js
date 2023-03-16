// For the SW
import * as config from "../config.js";
if (typeof $aero === "undefined")
	var $aero = {
		config,
		proxyLocation: {
			href: null,
		},
	};

/**
 * This should not be used for processed html attributes, rather rewriteSrcHtml
 * @param {string} - The url to rewrite
 * @param {string} - The url to rewrite
 */
$aero.rewriteSrc = (url, proxyUrl = $aero.proxyLocation.href) => {
	// Protocol
	const rewrittenUrl = /^(https?:\/\/)/g.test(url)
		? $aero.config.prefix + url
		: new URL(url, proxyUrl).href;

	if ($aero.config.debug.src) console.info(`${url} ➜ ${rewrittenUrl}`);

	return rewrittenUrl;
};

export default $aero;
