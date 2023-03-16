// For the SW
import * as config from "../config.js";
if (typeof $aero === "undefined")
	var $aero = {
		config,
	};

function rewriteGetCookie(cookie) {
	return cookie
		.replace(
			new RegExp(
				`(?<=path\=)${$aero.config.prefix}${$aero.location.origin}.*(?= )`,
				"g"
			),
			match =>
				match.replace(
					new RegExp(
						`^(${$aero.config.prefix}${$aero.location.origin})`
					),
					""
				)
		)
		.replace(/_path\=.*(?= )/g, "");
}
function rewriteSetCookie(cookie) {
	return cookie.replace(
		/(?<=path\=).*(?= )/g,
		`${$aero.config.prefix}${$aero.location.origin}$& _path=$&`
	);
}

$aero.rewriteGetCookie = rewriteGetCookie;
$aero.rewriteSetCookie = rewriteSetCookie;

export { rewriteGetCookie, rewriteSetCookie };
