$aero.location = $aero.locationProxy;
$aero.location["Symbol.toStringTag"] = "Location";

Object.defineProperty(document, "domain", {
	get: () => $aero.proxyLocation.hostname,
});
Object.defineProperty(document, "URL", {
	get: () => $aero.proxyLocation.href,
});
