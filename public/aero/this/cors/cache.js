import { cacheKey } from "../../config.js";

export default class {
	/**
	 * @param {headers} - Req headers used to get the cache mode
	 */
	constructor(headers) {
		// https://fetch.spec.whatwg.org/#concept-request-cache-mode
		if (
			this.mode === "default" &&
			headers.includes([
				"If-Modified-Since",
				"If-None-Match",
				"If-Unmodified-Since",
				"If-Match",
				"If-Range",
			])
		)
			this.mode = "no-store";
		else this.mode = headers["x-aero-cache"] ?? "";
	}

	get bypass() {
		return this.mode === "no-store" || this.mode === "reload";
	}

	get #getTime() {
		return Date.now() / 1000;
	}

	async #getCache() {
		return await caches.open(cacheKey);
	}

	/**
	 * @param {string} - Proxy origin
	 */
	async clear(origin) {
		const cache = await this.#getCache();

		for (const url of await cache.keys)
			if (url.startsWith(origin)) cache.delete(url);
	}
	/**
	 * @param {string} - Cache Control HTTP Header
	 * @param {string} - Expire HTTP Header for fallback
	 * @returns {number}
	 */
	async getAge(cacheControl, expiry) {
		if (cacheControl) {
			const dirs = cacheControl.split(";").map(dir => dir.trim());

			const secs = dirs
				.find(dir => dir.startsWith("max-age"))
				.split("=")
				.pop();

			return secs + this.#getTime;
		} else if (expiry) return Date.parse(expiry).getTime() / 1000;
		return false;
	}
	/**
	 * @param {string} - Proxy path
	 * @param {number} - Cache age
	 * @returns {Response | boolean} - Cached resp
	 */
	async get(path, age) {
		const cache = await this.#getCache();

		if (
			// Bypass caches
			this.mode !== "no-store" ||
			this.mode !== "reload" ||
			this.mode !== "no-cache" ||
			// Ignore freshness
			this.mode === "force-cache" ||
			this.mode === "only-if-cached" ||
			// Check the freshness
			age < getTime()
		) {
			const resp = cache.match(path);

			return resp instanceof Response ? resp : false;
		}

		return false;
	}
	/**
	 * @param {string} - Proxy path
	 * @param {string} - Proxy resp
	 */
	async set(path, resp) {
		const cache = await this.#getCache();

		if (this.mode !== "no-store" && this.mode !== "only-if-cached")
			await cache.put(path, resp);
	}
}
