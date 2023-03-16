/**
 * Extends src rewriting for processed html urls
 * @param {string} - The url to rewrite
 */
$aero.rewriteHtmlSrc = src => {
	const url = $aero.proto.get(
		src.replace(new RegExp(`^(${location.origin})`, "g"), "")
	);

	if (/^javascript:/g.test(url)) return $aero.scope(url);
	if (
		// Ignore data protocols
		/^(about:|data:)/g.test(url) ||
		// Don't rewrite again
		new RegExp(`^(${$aero.config.prefix})`).test(url)
	)
		return url;

	return $aero.rewriteSrc(url);
};
