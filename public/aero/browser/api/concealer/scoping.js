// Scope Checking
// In case a function overwrites the value of location in its parameters
$aero.isLocation = val => val === location;
$aero.check = val => (val == location ? $aero.location : val);

// Evals
$aero.eval = new Proxy(eval, {
	apply(_target, _that, args) {
		args[0] = $aero.scope(args[0]);

		return Reflect.apply(...arguments);
	},
});
Function = new Proxy(Function, {
	construct(_that, args) {
		let [func] = args;

		let bak = "";

		if (typeof func === "string") {
			bak = func;
			func = $aero.scope(func);
		} else if (
			typeof func === "function" &&
			!func.toString() !== `function ${func.name}() { [native code] }"`
		) {
			bak = func.toString();
			func = $aero.scope(func.toString());
		}

		args[0] = func;

		const inst = Reflect.construct(...arguments);

		// Use Object.defined to conceal the getter
		inst.bak = bak;

		// Hide the changes from the site
		inst.toString = () => bak;

		return inst;
	},
});

// Reflectors
Reflect.get = new Proxy(Reflect.get, {
	apply(target, _that, args) {
		const [theTarget, theProp] = args;

		if (theTarget instanceof Window && theProp === "location")
			return $aero.location;
		if (theTarget instanceof Document) {
			if (theProp === "location") return $aero.location;
			if (theProp === "domain") return $aero.document.domain;
			if (theProp === "URL") return $aero.document.URL;
		}
		if (theTarget instanceof Location) return $aero.location[theProp];
		return target(...args);
	},
});
Reflect.set = new Proxy(Reflect.set, {
	apply(target, _that, args) {
		const [_target, prop, value] = args;

		if (_target instanceof Location) return ($aero.location[prop] = value);
		return target(...args);
	},
});

// Objects
Object.getOwnPropertyDescriptor = new Proxy(Object.getOwnPropertyDescriptor, {
	apply(_target, _that, args) {
		let [obj, prop] = args;

		if (obj === location || (obj === window && prop === "location"))
			obj = $aero.location;

		args[0] = obj;

		return Reflect.apply(...arguments);
	},
});
