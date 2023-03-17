export declare type BareMethod = 'GET' | 'POST' | 'DELETE' | 'OPTIONS' | 'PUT' | 'PATCH' | 'UPDATE' | string;
export declare type BareCache = 'default' | 'no-store' | 'reload' | 'no-cache' | 'force-cache' | 'only-if-cached' | string;
export interface XBare {
    status?: number;
    statusText?: string;
    headers?: Headers;
    rawHeaders?: BareHeaders;
}
export declare type BareHTTPProtocol = 'blob:' | 'http:' | 'https:' | string;
export declare type BareWSProtocol = 'ws:' | 'wss:' | string;
export declare type urlLike = URL | string;
export declare const maxRedirects = 20;
export declare type BareHeaders = {
    [key: string]: string | string[];
};
/**
 * WebSocket with an additional property.
 */
export declare type BareWebSocket = WebSocket & {
    meta: Promise<XBare>;
};
/**
 * A Response with additional properties.
 */
export declare type BareResponse = Response & {
    rawResponse: Response;
    rawHeaders: BareHeaders;
};
/**
 * A BareResponse with additional properties.
 */
export declare type BareResponseFetch = BareResponse & {
    finalURL: string;
};
export declare type BareBodyInit = Blob | BufferSource | FormData | URLSearchParams | ReadableStream | undefined | null;
export declare type BareFetchInit = {
    method?: BareMethod;
    headers?: Headers | BareHeaders;
    body?: BareBodyInit;
    cache?: BareCache;
    redirect?: 'follow' | 'manual' | 'error' | string;
    signal?: AbortSignal;
};
export declare type BareMaintainer = {
    email?: string;
    website?: string;
};
export declare type BareProject = {
    name?: string;
    description?: string;
    email?: string;
    website?: string;
    repository?: string;
    version?: string;
};
export declare type BareLanguage = 'NodeJS' | 'ServiceWorker' | 'Deno' | 'Java' | 'PHP' | 'Rust' | 'C' | 'C++' | 'C#' | 'Ruby' | 'Go' | 'Crystal' | 'Shell' | string;
export declare type BareManifest = {
    maintainer?: BareMaintainer;
    project?: BareProject;
    versions: string[];
    language: BareLanguage;
    memoryUsage?: number;
};
