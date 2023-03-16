// Custom protocols
$aero.proto = {
	get(scheme) {
		return scheme.replace(
			new RegExp(`^(web+${$aero.proxyLocation.origin}+)`),
			"web+"
		);
	},
	set(scheme) {
		let split = scheme.split("web+");

		split.splice(1, 0, `${$aero.proxyLocation.origin}+`);

		return split.join();
	},
};
