import Client, { BareError, statusCache, statusEmpty } from './Client.js';
import { split_headers, join_headers } from './splitHeaderUtil.js';
import md5 from './md5.js';
import global from './global.js';

const { fetch, WebSocket, Request } = global;

export default class ClientV2 extends Client {
	static version = 2;
	constructor(...args) {
		super(...args);

		this.ws = new URL(this.base);
		this.http = new URL(this.base);
		this.new_meta = new URL('./ws-new-meta', this.base);
		this.get_meta = new URL(`./ws-meta`, this.base);

		if (this.ws.protocol === 'https:') {
			this.ws.protocol = 'wss:';
		} else {
			this.ws.protocol = 'ws:';
		}
	}
	async connect(request_headers, protocol, host, port, path) {
		const request = new Request(this.new_meta);

		this.#write_bare_request(
			request.headers,
			protocol,
			host,
			path,
			port,
			request_headers
		);

		const assign_meta = await fetch(request);

		if (!assign_meta.ok) {
			throw new BareError(assign_meta.status, await assign_meta.json());
		}

		const id = await assign_meta.text();

		const socket = new WebSocket(this.ws, [id]);

		socket.meta = new Promise((resolve, reject) => {
			socket.addEventListener('open', async () => {
				const outgoing = await fetch(this.get_meta, {
					headers: {
						'x-bare-id': id,
					},
					method: 'GET',
				});

				resolve(await this.#read_bare_response(outgoing));
			});

			socket.addEventListener('error', reject);
		});

		return socket;
	}
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
		if (protocol.startsWith('blob:')) {
			const response = await fetch(`blob:${location.origin}${path}`);
			response.jsonHeaders = Object.fromEntries(response.headers.entries());
			return response;
		}

		const bare_headers = {};

		if (request_headers instanceof Headers) {
			for (let [header, value] of request_headers) {
				bare_headers[header] = value;
			}
		} else {
			for (let header in request_headers) {
				bare_headers[header] = request_headers[header];
			}
		}

		const options = {
			credentials: 'omit',
			method: method,
			signal,
		};

		if (cache !== 'only-if-cached') {
			options.cache = cache;
		}

		if (body !== undefined) {
			options.body = body;
		}

		const request = new Request(
			this.http + '?cache=' + md5(`${protocol}${host}${port}${path}`),
			options
		);

		this.#write_bare_request(
			request.headers,
			protocol,
			host,
			path,
			port,
			bare_headers
		);

		const response = await fetch(request);

		const read_response = await this.#read_bare_response(response);

		let { status, statusText, headers, rawHeaders } = read_response;

		let result;

		if (statusCache.includes(status)) {
			status = response.status;
			statusText = response.statusText;
		}

		if (statusEmpty.includes(status)) {
			result = new Response(undefined, {
				status,
				statusText,
				headers,
			});
		} else {
			result = new Response(response.body, {
				status,
				statusText,
				headers,
			});
		}

		result.rawHeaders = rawHeaders;
		result.rawResponse = response;
		result.cached = statusCache.includes(read_response.status);

		return result;
	}
	async #read_bare_response(response) {
		if (!response.ok) {
			throw new BareError(response.status, await response.json());
		}

		const response_headers = join_headers(response.headers);

		if (response_headers.error) {
			throw new BareError(response_headers.error);
		}

		const status = parseInt(response_headers.get('x-bare-status'));
		const statusText = response_headers.get('x-bare-status-text');
		const rawHeaders = JSON.parse(response_headers.get('x-bare-headers'));
		const headers = new Headers(rawHeaders);

		return {
			status,
			statusText,
			headers,
			rawHeaders,
		};
	}
	#write_bare_request(
		headers,
		protocol,
		host,
		path,
		port,
		bare_headers,
		forward_headers = ['cookie', 'content-security-policy', 'user-agent', 'pragma', 'x-frame-options'],
		pass_headers = [],
		pass_status = []
	) {
		headers.set('x-bare-protocol', protocol);
		headers.set('x-bare-host', host);
		headers.set('x-bare-path', path);
		headers.set('x-bare-port', port);
		headers.set('x-bare-headers', JSON.stringify(bare_headers));

		for (let header of forward_headers) {
			headers.append('x-bare-forward-headers', header);
		}

		for (let header of pass_headers) {
			headers.append('x-bare-pass-headers', header);
		}

		for (let status of pass_status) {
			headers.append('x-bare-pass-status', status);
		}

		split_headers(headers);

		return headers;
	}
}
