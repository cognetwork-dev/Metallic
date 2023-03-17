import type { BareBodyInit, BareCache, BareHeaders, BareHTTPProtocol, BareMethod, BareResponse, BareWebSocket, BareWSProtocol } from './BareTypes.js';
import Client from './Client.js';
import type { GenericClient } from './Client.js';
export default class ClientV2 extends Client implements GenericClient {
    ws: URL;
    http: URL;
    newMeta: URL;
    getMeta: URL;
    constructor(server: URL);
    connect(requestHeaders: BareHeaders, protocol: BareWSProtocol, host: string, port: string | number, path: string): Promise<BareWebSocket>;
    request(method: BareMethod, requestHeaders: BareHeaders, body: BareBodyInit, protocol: BareHTTPProtocol, host: string, port: string | number, path: string, cache: BareCache | undefined, signal: AbortSignal | undefined): Promise<BareResponse>;
    private readBareResponse;
    createBareHeaders(protocol: BareWSProtocol | BareHTTPProtocol, host: string, path: string, port: number | string, bareHeaders: BareHeaders, forwardHeaders?: string[], passHeaders?: string[], passStatus?: number[]): Headers;
}
