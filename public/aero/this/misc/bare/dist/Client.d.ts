import type { BareBodyInit, BareCache, BareHeaders, BareHTTPProtocol, BareMethod, BareResponse, BareWebSocket, BareWSProtocol } from './BareTypes.js';
export declare const statusEmpty: number[];
export declare const statusRedirect: number[];
export interface BareErrorBody {
    code: string;
    id: string;
    message?: string;
    stack?: string;
}
export declare class BareError extends Error {
    status: number;
    body: BareErrorBody;
    constructor(status: number, body: BareErrorBody);
}
export interface GenericClient {
    connect(requestHeaders: BareHeaders, protocol: BareWSProtocol, host: string, port: string | number, path: string): Promise<BareWebSocket>;
    request(method: BareMethod, requestHeaders: BareHeaders, body: BareBodyInit, protocol: BareHTTPProtocol, host: string, port: string | number, path: string, cache: BareCache | undefined, signal: AbortSignal | undefined): Promise<BareResponse>;
}
export default class Client {
    protected base: URL;
    /**
     *
     * @param version Version provided by extension
     * @param server Bare Server URL provided by BareClient
     */
    constructor(version: number, server: URL);
}
