// Gets the sources in the CSP with directive
$aero.cspSrc = dir => {
	const [sources] = $aero.cors.csp.match(new RegExp(`${dir} ([^;]*)`), "g");

	if (typeof sources === "undefined") return;

	return sources.split(" ");
};

// If CSP blocked
$aero.checkCsp = dir => {
	const sources = $aero.cspSrc(dir);

	let blocked = false;

	if (sources) {
		let allowed = false;

		if (!sources.includes("'none'"))
			for (const source of sources) {
				if ($aero.proxyLocation.href.startsWith(source)) {
					allowed = true;
					break;
				}

				const wc = source.split("*");

				if (
					// Wildcard found
					wc.length > 1 &&
					$aero.proxyLocation.href.startsWith(wc[0])
				) {
					allowed = true;
					break;
				}
			}

		if (!allowed) blocked = true;
	}

	return blocked;
};
