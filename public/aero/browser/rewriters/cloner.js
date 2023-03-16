// In the case of CORS attributes present the original is deleted and a new clone is made because it isn't possible to modify the CORS properties internally
$aero.Cloner = class {
	/**
	 * Clones an element without their read-only integrity attribute
	 * @constructor
	 * @param {element} - The element to be cloned
	 */
	constructor(el) {
		let copy = document.createElement(el.tagName);

		this.el = el;
		this.copy = copy;

		copy.observed = true;

		for (const name of el.getAttributeNames())
			if (name !== "integrity") copy[name] = el[name];

		if ("innerHTML" in el && el.innerHTML !== "")
			$aero.safeText(copy, el.innerHTML);
	}
	clone() {
		// Insert
		this.el.after(this.copy);
	}
	cleanup() {
		if (this.el instanceof HTMLScriptElement) {
			// Disable old script by breaking the type so it doesn't run
			this.el.type = "_";

			$aero.safeText(this.el, "");
		}

		this.el.remove();
	}
};
