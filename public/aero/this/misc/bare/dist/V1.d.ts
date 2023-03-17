import type { BareBodyInit, BareCache, BareHeaders, BareHTTPProtocol, BareMethod, BareResponse, BareWebSocket, BareWSProtocol } from './BareTypes';
import type { GenericClient } from './Client';
import Client from './Client';
export default class ClientV1 extends Client implements GenericClient {
    ws: URL;
    http: URL;
    newMeta: URL;
    getMeta: URL;
    constructor(server: URL);
    connect(requestHeaders: BareHeaders, protocol: BareWSProtocol, host: string, port: string | number, path: string): Promise<BareWebSocket>;
    request(method: BareMethod, requestHeaders: BareHeaders, body: BareBodyInit, protocol: BareHTTPProtocol, host: string, port: string | number, path: string, cache: BareCache | undefined, signal: AbortSignal | undefined): Promise<BareResponse>;
    private readBareResponse;
    private writeBareRequest;
}
