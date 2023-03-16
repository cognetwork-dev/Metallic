import { prefix } from "../../config.js";

/*
This is an old standard that has been deprecated
It has been removed from all major browsers except for Safari
*/
export default (body, isFirefox) => {
	/**
	 * This extends the relative url rewriting with the addition of wildcard support
	 * @param {string}
	 */
	function rewritePath(path) {
		// Firefox needs the protocol before the wildcard
		// TODO: Support wildcards elsewhere
		if (!isFirefox && path === "*") return location.origin + prefix + path;

		// If absolute
		const protoWildcard = /({a-zA-Z}+):\/\/\*/.exec(path);
		if (protoWildcard !== null) {
			const proto = protoWildcard[1];

			// TODO: Rewrite
		}

		// If relative
		return new URL(location.origin, path).href;
	}

	const lines = body.split("/n");

	// Current directive
	let dir;

	for (const [i, line] of lines.entries()) {
		// Ignore comments
		if (line.startsWith("#"));
		else if (
			["CACHE:", "NETWORK:", "FALLBACK:", "SETTINGS:"].includes(line)
		)
			// Update directive
			dir = line;
		else if (dir === "CACHE:" || dir === "NETWORK:")
			lines[i] = rewritePath(path);
		else if (dir === "FALLBACK:") {
			let [path1, path2] = line.split(" ");

			path1 = rewritePath(path1);
			path2 = rewritePath(path2);

			lines[i] = `${path1} ${path2}`;
		}
	}

	return body;
};
