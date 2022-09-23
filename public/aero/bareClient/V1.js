import Client, { BareError, statusEmpty } from './Client.js';
import { encodeProtocol } from './encodeProtocol.js';
import global from './global.js';

const { fetch, WebSocket } = global;

export default class ClientV1 extends Client {
	static version = 1;
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
		const assign_meta = await fetch(this.new_meta, { method: 'GET' });

		if (!assign_meta.ok) {
			throw BareError(assign_meta.status, await assign_meta.json());
		}

		const id = await assign_meta.text();

		const socket = new WebSocket(this.ws, [
			'bare',
			encodeProtocol(
				JSON.stringify({
					remote: {
						protocol,
						host,
						port,
						path,
					},
					headers: request_headers,
					forward_headers: [
						'accept-encoding',
						'accept-language',
						'sec-websocket-extensions',
						'sec-websocket-key',
						'sec-websocket-version',
					],
					id,
				})
			),
		]);

		socket.meta = new Promise((resolve, reject) => {
			socket.addEventListener('open', async () => {
				const outgoing = await fetch(this.get_meta, {
					headers: {
						'x-bare-id': id,
					},
					method: 'GET',
				});

				if (!outgoing.ok) {
					reject(new BareError(outgoing.status, await outgoing.json()));
				}

				resolve(await outgoing.json());
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
		_cache,
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

		const forward_headers = ['accept-encoding', 'accept-language'];

		const options = {
			credentials: 'omit',
			method: method,
			signal,
		};

		if (body !== undefined) {
			options.body = body;
		}

		// bare can be an absolute path containing no origin, it becomes relative to the script
		const request = new Request(this.http, options);

		this.#write_bare_request(
			request,
			protocol,
			host,
			path,
			port,
			bare_headers,
			forward_headers
		);

		const response = await fetch(request);

		const read_response = await this.#read_bare_response(response);

		let { status, statusText, headers, rawHeaders } = read_response;

		let result;

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
		result.rawResponse = rawResponse;
		result.cached = false;

		return result;
	}
	async #read_bare_response(response) {
		if (!response.ok) {
			throw new BareError(response.status, await response.json());
		}

		const status = parseInt(response.headers.get('x-bare-status'));
		const statusText = response.headers.get('x-bare-status-text');
		const rawHeaders = JSON.parse(response.headers.get('x-bare-headers'));
		const headers = new Headers(rawHeaders);

		return {
			status,
			statusText,
			rawHeaders,
			headers,
		};
	}
	#write_bare_request(
		request,
		protocol,
		host,
		path,
		port,
		bare_headers,
		forward_headers
	) {
		request.headers.set('x-bare-protocol', protocol);
		request.headers.set('x-bare-host', host);
		request.headers.set('x-bare-path', path);
		request.headers.set('x-bare-port', port);
		request.headers.set('x-bare-headers', JSON.stringify(bare_headers));
		request.headers.set(
			'x-bare-forward-headers',
			JSON.stringify(forward_headers)
		);
	}
}
