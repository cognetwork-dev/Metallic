export declare const fetch: typeof globalThis.fetch;
export declare const WebSocket: {
    new (url: string | URL, protocols?: string | string[] | undefined): WebSocket;
    prototype: WebSocket;
    readonly CLOSED: number;
    readonly CLOSING: number;
    readonly CONNECTING: number;
    readonly OPEN: number;
};
export declare const Request: {
    new (input: URL | RequestInfo, init?: RequestInit | undefined): Request;
    prototype: Request;
};
export declare const Response: {
    new (body?: BodyInit | null | undefined, init?: ResponseInit | undefined): Response;
    prototype: Response;
    error(): Response;
    redirect(url: string | URL, status?: number | undefined): Response;
};
export declare const XMLHttpRequest: {
    new (): XMLHttpRequest;
    prototype: XMLHttpRequest;
    readonly DONE: number;
    readonly HEADERS_RECEIVED: number;
    readonly LOADING: number;
    readonly OPENED: number;
    readonly UNSENT: number;
};
