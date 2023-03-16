/*
Error emulation
These properties are not standard, so functionality is different in browsers
These interceptors will probably change a lot over time
*/
if ($aero.config.flags.nonstandard) {
	Error = new Proxy(Error, {
		construct() {
			const ret = Reflect.construct(...arguments);

			// Firefox exclusives
			// Error location
			if (typeof ret.columnNumber !== "undefined")
				// TODO: Get the column number of the unscoped file
				// Possibly, add a data attribute with the og script
				ret.columnNumber = "";
			if (typeof ret.fileName !== "undefined")
				ret.fileName = $aero.afterPrefix(ret.fileName);

			// Implemented in most major browsers
			if (typeof ret.stack !== "undefined")
				if (navigator.userAgent.includes("Firefox")) {
					const match = /Firefox\/([\d\.]+)/g.exec(
						navigator.userAgent
					);

					if (match.length === 2) {
						ver = parseFloat(match[1]);

						ret.stack = res.stack.replace(
							new RegExp(
								`^(@)(.+)(\\d+${ver >= 30 ? ":\\d+" : ""})$`,
								"g"
							),
							(_match, g1, g2, g3) =>
								g1 + $aero.afterPrefix(g2) + g3
						);
					}
				} else if (navigator.userAgent.includes("Chrome"))
					ret.stack = ret.stack
						.split("\n")
						.map(line =>
							line.includes(
								location.origin + $aero.config.aeroPrefix
							)
								? ""
								: line
						)
						.join("\n")
						.replace(
							/^(at )([A-Za-z\.]+ )?.+(?=:\d+:\d+)/g,
							(_match, g1, g2, g3) =>
								g1 + g2 + $aero.afterPrefix(g3)
						)
						.replace(
							/(?<=\().+(?=:\d+:\d+\))/g,
							(_match, g1, g2) => g1 + $aero.afterPrefix(g2)
						);
			// TODO: Support Safari

			return ret;
		},
	});
}
