// Locates the global object.

let g;

if (typeof self === 'object' && self !== undefined) {
	g = self;
}
if (typeof globalThis === 'object' && globalThis !== undefined) {
	g = globalThis;
} else if (typeof window === 'object' && window !== undefined) {
	g = window;
}

/**
 * @type {globalThis}
 */
let global;
export default global = g;
