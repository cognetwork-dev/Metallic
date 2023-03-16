// For Cors Emulation

/*
Trusted Types
To comply with trusted type headers if applicable
*/
$aero.tt = trustedTypes.createPolicy("$aero", {
	createHTML: str => str,
	createScript: str => str,
});

// A safe wrapper for text to comply with trusted types
$aero.safeText = (el, str) => {
	const isScript = el instanceof HTMLScriptElement;

	el.innerHTML = $aero.config.flags.corsEmulation
		? $aero.tt[isScript ? "createHTML" : "createScript"](str)
		: str;
};
