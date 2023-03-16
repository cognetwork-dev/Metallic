// Interceptors for StyleSheet

function getSheet(sheet) {
	if (sheet.href) sheet.href = $aero.afterPrefix(sheet.href);
	if (sheet.parentStyleSheet)
		sheet.parentStyleSheet = getSheet(sheet.parentStyleSheet);

	return sheet;
}

let bak = document.styleSheets;
Object.defineProperty(document, "styleSheets", {
	get: () => {
		// StyleSheetList is read-only so the getter itself needs to be proxified
		ret.item = new Proxy(ret.item, {
			apply() {
				return getSheet(Reflect.apply(...arguments));
			},
		});

		return ret;
	},
});

// TODO: Support XML ProcessingInstruction.sheet
