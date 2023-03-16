import { aeroPrefix } from "../../config.js";

export default (cats, escape) => {
	const createScript = path =>
		`<script src="${path}"><${escape ? "\\" : ""}/script>`;

	var ret = "\n";

	// The src rewriter needs proxyLocation early
	ret += createScript(`${aeroPrefix}browser/misc/proxyLocation.js`) + "\n";

	for (const cat in cats)
		ret +=
			cats[cat]
				.map(file => createScript(`${aeroPrefix + cat}/${file}.js`))
				.join("\n") + "\n";

	return ret;
};
