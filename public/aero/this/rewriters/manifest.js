import aero from "../../shared/src.js";
const { rewriteSrc } = aero;

export default (body, proxyUrl) => {
	const json = JSON.parse(body);

	json.scope = rewriteSrc(json.scope, proxyUrl);
	json.start_url = rewriteSrc(json.start_url, proxyUrl);

	for (icon of json.icons) icon.src = rewriteSrc(icon.src, proxyUrl);
	for (handlers of json.protocol_handlers)
		handlers.src = rewriteSrc(handlers.src, proxyUrl);
	for (apps of json.related_application)
		apps.src = rewriteSrc(apps.src, proxyUrl);

	return JSON.stringify(json);
};
