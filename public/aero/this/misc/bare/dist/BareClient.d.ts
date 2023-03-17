import type { BareBodyInit, BareCache, BareHeaders, BareHTTPProtocol, BareManifest, BareMethod, BareResponse, BareResponseFetch, BareWebSocket, BareWSProtocol, urlLike } from './BareTypes';
export * from './Client';
export default class BareClient {
    /**
     * @depricated Use .manifest instead.
     */
    get data(): BareClient['manfiest'];
    manfiest?: BareManifest;
    private client?;
    private server;
    private working?;
    private onDemand;
    private onDemandSignal?;
    /**
     * Lazily create a BareClient. Calls to fetch and connect will request the manifest once on-demand.
     * @param server A full URL to the bare server.
     * @param signal An abort signal for fetching the manifest on demand.
     */
    constructor(server: string | URL, signal?: AbortSignal);
    /**
     * Immediately create a BareClient.
     * @param server A full URL to the bare server.
     * @param manfiest A Bare server manifest.
     */
    constructor(server: string | URL, manfiest?: BareManifest);
    private demand;
    private getClient;
    request(method: BareMethod, requestHeaders: BareHeaders, body: BareBodyInit, protocol: BareHTTPProtocol, host: string, port: string | number, path: string, cache: BareCache | undefined, signal: AbortSignal | undefined): Promise<BareResponse>;
    connect(requestHeaders: BareHeaders, protocol: BareWSProtocol, host: string, port: string | number, path: string): Promise<BareWebSocket>;
    /**
     *
     * @param url
     * @param headers
     * @param protocols
     * @returns
     */
    createWebSocket(url: urlLike, headers?: BareHeaders | Headers, protocols?: string | string[]): Promise<BareWebSocket>;
    fetch(url: urlLike | Request, init?: RequestInit): Promise<BareResponseFetch>;
}
/**
 *
 * Facilitates fetching the Bare server and constructing a BareClient.
 * @param server Bare server
 * @param signal Abort signal when fetching the manifest
 */
export declare function createBareClient(server: string | URL, signal?: AbortSignal): Promise<BareClient>;
