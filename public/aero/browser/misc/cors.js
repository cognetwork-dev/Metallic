$aero.cors.csp = $aero.cors.headers.csp;
if ($aero.cors.clear)
	$aero.cors.clear = JSON.parse(`[${$aero.cors.headers.clear}]`);
// TODO: Parse and use in perms.js
$aero.cors.perms = $aero.cors.perms.split(";");
