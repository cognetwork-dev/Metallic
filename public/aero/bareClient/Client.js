export const statusEmpty = [101, 204, 205, 304];
export const statusCache = [304];

export class BareError extends Error {
	constructor(status, body) {
		super(body.message);
		this.status = status;
		this.body = body;
	}
}

export default class Client {
	constructor(bare) {
		this.bare = bare;
		this.version = this.constructor.version;
		this.base = new URL(`./v${this.version}/`, this.bare.server);
	}
	async request() {
		throw new Error('Not implemented');
	}
	async connect() {
		throw new Error('Not implemented');
	}
}
