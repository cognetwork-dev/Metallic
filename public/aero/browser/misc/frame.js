// Frame checks
if (frameElement) {
	function block() {
		frameElement.remove();
	}

	const parentOrigin = frameElement.parentProxyOrigin;

	if (parentOrigin)
		throw new Error("The parent's proxy origin wasn't given to the frame");

	const frameOptions = $aero.cors.headers.frame;

	if (frameOptions === "DENY") block();
	else if (frameOptions === "SAMEORIGIN") {
		if ($aero.proxyLocation.origin !== parentOrigin) block();
	} else if (csp.contains("frame-ancestors")) {
		const sources = $aero.cspSrc("frame-ancestors");

		if (sources.contains("'none'")) block();
		else {
			let allowed = false;

			for (source of sources) {
				if (
					source === "'self'" &&
					parentOrigin === $aero.proxyLocation.origin
				) {
					allowed = true;
					break;
				}
				if (source === parentOrigin) {
					allowed = true;
					break;
				}
			}

			if (!allowed) block();
		}
	}
	// Still supported on Firefox mobile
	else if (
		$aero.config.flags.legacy &&
		frameOptions.startsWith("ALLOW-FROM=")
	) {
		const [allowedOrigin] = frameOptions.match(/ALLOW-FROM=(.+)/g);

		if (allowedOrigin) if (allowedOrigin !== parentOrigin) block();
	}
}
