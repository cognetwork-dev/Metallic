// Implements the protocol for requesting bare data from a server
// See ../Server/Send.mjs

export * from './Client.js';
import ClientV1 from './V1.js';
import ClientV2 from './V2.js';

/**
 * @typedef {object.<string, string|string[]>} BareHeaders
 */

/**
 * @typedef {object} BareMeta
 * @property {object} headers
 */

/**
 * @description WebSocket with an additional property.
 * @typedef {object} BareWebSocketBase
 * @property {Promise<BareMeta>} meta
 */

/**
 * @typedef {WebSocket & BareWebSocketBase} BareWebSocket
 */

/**
 * @description A Response with additional properties.
 * @typedef {object} BareResponseBase
 * @property {Response} rawResponse
 * @property {BareHeaders} rawHeaders
 * @property {boolean} cached
 */

/**
 * @typedef {Response & BareResponseBase} BareResponse
 */

/**
 * @typedef {object} BareFetchInit
 * @property {'GET'|'POST'|'DELETE'|'OPTIONS'|'PUT'|'PATCH'|'UPDATE'} [method]
 * @property {Headers|BareHeaders} [headers]
 * @property {Blob|BufferSource|FormData|URLSearchParams|ReadableStream} [body]
 * @property {'default'|'no-store'|'reload'|'no-cache'|'force-cache'|'only-if-cached'} [cache]
 * @property {AbortSignal} signal
 * @returns {BareResponse}
 */

export default class BareClient {
	ready = false;
	/**
	 *
	 * @param {string|URL} server - A full URL to theb are server.
	 * @param {object} [data] - The a copy of the Bare server data found in BareClient.data. If specified, this data will be loaded. Otherwise, a request will be made to the bare server (upon fetching or creating a WebSocket).
	 */
	constructor(server, data) {
		this.server = new URL(server);

		if (typeof data === 'object') {
			this.#loadData(data);
		}
	}
	#loadData(data) {
		let found = false;

		// newest-oldest
		for (let constructor of [ClientV2, ClientV1]) {
			if (data.versions.includes(`v${constructor.version}`)) {
				this.client = new constructor(this);
				found = true;
				break;
			}
		}

		if (!found) {
			throw new Error(`Unable to find compatible client version.`);
		}

		this.data = data;
		this.ready = true;
	}
	async #work() {
		if (this.ready === true) {
			return;
		}

		const outgoing = await fetch(this.server);

		if (!outgoing.ok) {
			throw new Error(
				`Unable to fetch Bare meta: ${outgoing.status} ${await outgoing.text()}`
			);
		}

		this.#loadData(await outgoing.json());
	}
	/**
	 *
	 * @param {'GET'|'POST'|'DELETE'|'OPTIONS'|'PUT'|'PATCH'|'UPDATE'} method
	 * @param {BareHeaders} request_headers
	 * @param {Blob|BufferSource|FormData|URLSearchParams|ReadableStream} body
	 * @param {'http:'|'https:'} protocol
	 * @param {string} host
	 * @param {string|number} port
	 * @param {string} path
	 * @param {'default'|'no-store'|'reload'|'no-cache'|'force-cache'|'only-if-cached'} cache
	 * @param {AbortSignal} signal
	 * @returns {BareResponse}
	 */
	async request(
		method,
		request_headers,
		body,
		protocol,
		host,
		port,
		path,
		cache,
		signal
	) {
		await this.#work();
		return this.client.request(
			method,
			request_headers,
			body,
			protocol,
			host,
			port,
			path,
			cache,
			signal
		);
	}
	/**
	 *
	 * @param {BareHeaders} request_headers
	 * @param {'ws:'|'wss:'} protocol
	 * @param {string} host
	 * @param {string|number} port
	 * @param {string} path
	 * @returns {BareWebSocket}
	 */
	async connect(request_headers, protocol, host, port, path) {
		await this.#work();
		return this.client.connect(request_headers, protocol, host, port, path);
	}
	/**
	 *
	 * @param {string|URL} url
	 * @param {BareFetchInit} init
	 * @returns {BareResponse}
	 */
	async fetch(url, init = {}) {
		url = new URL(url);

		let method;

		if (typeof init.method === 'string') {
			method = init.method;
		} else {
			method = 'GET';
		}

		let body;

		if (init.body !== undefined && init.body !== null) {
			body = init.body;
		}

		let headers;

		if (typeof init.headers === 'object' && init.headers !== null) {
			if (init.headers instanceof Headers) {
				headers = Object.fromEntries(init.headers);
			} else {
				headers = init.headers;
			}
		} else {
			headers = {};
		}

		headers.host = url.host;

		let cache;

		if (typeof init.cache === 'string') {
			cache = init.cache;
		} else {
			cache = 'default';
		}

		let signal;

		if (init.signal instanceof AbortSignal) {
			signal = init.signal;
		}

		let port;

		if (url.port === '') {
			if (url.protocol === 'https:') {
				port = '443';
			} else {
				port = '80';
			}
		} else {
			port = url.port;
		}

		return this.request(
			method,
			headers,
			body,
			url.protocol,
			url.hostname,
			port,
			url.pathname + url.search,
			cache,
			signal
		);
	}
}
