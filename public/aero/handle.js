// Routes
import routes from "./this/internal/routes.js";

// Dynamic Config
import getConfig from "./this/dynamic/getConfig.js";
// Standard Config
import { prefix, aeroPrefix, debug, flags } from "./config.js";

// Utility
import BareClient from "./this/misc/bare/dist/BareClient.js";
import ProxyFetch from "./this/misc/ProxyFetch.js";
import sharedModule from "./this/misc/sharedModule.js";
import getRequestUrl from "./this/misc/getRequestUrl.js";
import headersToObject from "./this/misc/headersToObject.js";
import unwrapImports from "./this/misc/unwrapImports.js";

// Cors Emulation
import block from "./this/cors/test.js";

// Cache Emulation
import CacheManager from "./this/cors/cache.js";

// Rewriters
import rewriteReqHeaders from "./this/rewriters/reqHeaders.js";
import rewriteRespHeaders from "./this/rewriters/respHeaders.js";
import rewriteCacheManifest from "./this/rewriters/cacheManifest.js";
import rewriteManifest from "./this/rewriters/manifest.js";
import scope from "./shared/scope.js";

/**
 * Handles the requests
 * @param {FetchEvent} - The event
 * @returns {Response} - The proxified response
 */
async function handle(event) {
	const req = event.request;

	// Dynamic config
	const { backends, wsBackends, wrtcBackends } = getConfig();

	// Separate the prefix from the url to get the proxy url isolated
	const afterPrefix = url =>
		url.replace(new RegExp(`^(${location.origin}${prefix})`, "g"), "");

	const useBare = BareClient;

	// Construct proxy fetch instance
	const proxyFetch = useBare
		? // The bare client doesn't support proxy switching
		  new BareClient(backends[0])
		: new ProxyFetch(backends);

	const reqUrl = new URL(req.url);

	const path = reqUrl.pathname + reqUrl.search;

	// Remove the module components
	if (path.startsWith(aeroPrefix + "shared/") && path.endsWith(".js"))
		return await sharedModule(event);
	// Don't rewrite requests for aero library files
	if (path.startsWith(aeroPrefix))
		// Proceed with the request like normal
		return await fetch(req.url);

	var clientUrl;
	// Get the origin from the user's window
	if (event.clientId !== "") {
		// Get the current window
		const client = await clients.get(event.clientId);

		// Get the url after the prefix
		clientUrl = new URL(afterPrefix(client.url));
	}

	// Determine if the request was made to load the homepage; this is needed so that the proxy will know when to rewrite the html files (for example, you wouldn't want it to rewrite a fetch request)
	const homepage = req.mode === "navigate" && req.destination === "document";

	// This is used for determining the request url
	const iFrame = req.destination === "iframe";

	const navigate = homepage || iFrame;

	// Parse the request url to get the url to proxy
	const proxyUrl = new URL(
		getRequestUrl(
			reqUrl.origin,
			location.origin,
			clientUrl,
			path,
			homepage,
			iFrame
		)
	);

	// Ensure the request isn't blocked by CORS
	if (flags.corsEmulation && (await block(proxyUrl.href)))
		return new Response("Blocked by CORS", { status: 500 });

	// Log requests
	if (debug.url)
		console.log(
			req.destination == ""
				? `${req.method} ${proxyUrl.href}`
				: `${req.method} ${proxyUrl.href} (${req.destination})`
		);

	// Rewrite the request headers
	const reqHeaders = headersToObject(req.headers);

	// Cache mode emulation
	const cache = new CacheManager(reqHeaders);

	let injectHeaders = {};
	if (flags.corsEmulation) {
		injectHeaders = {
			// Cache Emulation
			timing: reqHeaders["timing-allow-origin"],
			// CORS Emulation
			clear: reqHeaders["clear-site-data"]
				? JSON.parse(`[${reqHeaders["clear-site-data"]}]`)
				: undefined,
			// TODO: Respect the permissions policy
			perms: reqHeaders["permissions-policy"],
			// These are parsed later in frame.js if needed
			frame: reqHeaders["x-frame-options"],
			// This is only used for getting the frame frameancesors for $aero.frame
			csp: reqHeaders["content-security-policy"],
		};

		if (injectHeaders.clear)
			await clear(injectHeaders.clear, event.clientId);
	}

	// Get the cache age before we start rewriting
	let cacheAge = cache.getAge(
		reqHeaders["cache-control"],
		reqHeaders["expires"]
	);

	const cacheResp = await cache.get(reqUrl, cacheAge);

	if (cacheResp) return cacheResp;

	if (cache.mode === "only-if-cached")
		// TODO: Properly emulate the network error
		return new Response("Can't find a cache", {
			status: 500,
		});

	const rewrittenReqHeaders = rewriteReqHeaders(
		prefix,
		reqHeaders,
		clientUrl,
		afterPrefix
	);

	let opts = {
		method: req.method,
		headers: rewrittenReqHeaders,
	};

	// A request body should only be created under a post request
	if (req.method === "POST") opts.body = await req.text();

	// Make the request to the proxy
	const resp = await proxyFetch.fetch(proxyUrl.href, opts);

	if (resp instanceof Error)
		return new Response(resp, {
			status: 500,
		});

	// Rewrite the response headers
	const respHeaders = headersToObject(resp.headers);

	const rewrittenRespHeaders = rewriteRespHeaders(
		flags.corsEmulation,
		respHeaders
	);

	// Backup headers to later conceal in http request api interceptors
	if (req.destination === "")
		rewriteGetCookie["x-aero-headers"] = JSON.stringify(respHeaders);

	const type = respHeaders["content-type"];

	const html =
		// Not all sites respond with a type
		typeof type === "undefined" || type.startsWith("text/html");

	// Rewrite the body

	/** @type {string | ReadableStream} */
	let body;

	// For modules
	const isMod = new URLSearchParams(location.search).mod === "true";

	// TODO: Support XML/XSLT
	if (navigate && html) {
		body = await resp.text();

		if (body !== "") {
			body = `
<!DOCTYPE html>
<head>
    <!-- Fix encoding issue -->
    <meta charset="utf-8">
    
    <!-- Favicon -->
    <!--
    Delete favicon if /favicon.ico isn't found
    This is needed because the browser will cache the favicon from the previous site
    -->
    <link href="data:image/x-icon;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQEAYAAABPYyMiAAAABmJLR0T///////8JWPfcAAAACXBIWXMAAABIAAAASABGyWs+AAAAF0lEQVRIx2NgGAWjYBSMglEwCkbBSAcACBAAAeaR9cIAAAAASUVORK5CYII=" rel="icon" type="image/x-icon">
    <!-- If not defined already, manually set the favicon -->
    <link href="${
		prefix + proxyUrl.origin
	}/favicon.ico" rel="icon" type="image/x-icon">
    
    <script>
        // Update the service worker
        navigator.serviceWorker
            .register("/sw.js", {
                scope: ${prefix},
                // Don't cache http requests
                updateViaCache: "none",
                type: "module",
            })
            // Update service worker
            .then(reg => reg.update())
            .catch(err => console.error(err.message));

        // Aero's global namespace
        var $aero = {
            config: {
                prefix: "${prefix}",
                wsBackends: ${JSON.stringify(wsBackends)},
                wrtcBackends: ${JSON.stringify(wrtcBackends)},
                debug: ${JSON.stringify(debug)},
                flags: ${JSON.stringify(flags)},
            },
            cors: ${JSON.stringify(injectHeaders)},
            // This is used to later copy into an iFrame's srcdoc; this is for an edge case
            imports: \`${unwrapImports(routes, true)}\`,
            afterPrefix: url => url.replace(new RegExp(\`^(\${location.origin}\${$aero.config.prefix})\`, "g"), ""),
        };
    </script>

	<script>
	// Sanity check
	if (!("$aero" in window)) {
		// Clear site
		document.head.innerHTML = "";
		document.write("Unable to initalize $aero");
	}
	</script>

    <!-- Injected Aero code -->
    ${unwrapImports(routes)}
</head>
${body}
`;
		}
	} else if (
		navigate &&
		(text.startsWith("text/xml") || text.startsWith("application/xml"))
	) {
		body = await resp.text();

		`
<config>
{
	prefix: ${prefix}
}
</config>
<?xml-stylesheet type="text/xsl" href="/aero/browser/xml/intercept.xsl"?>
${body}
		`;
	} else if (req.destination === "script") {
		body = "";

		if (flags.corsEmulation)
			// Integrity check
			body += `
(async () => {
	if (document.currentScript.hasAttribute("integrity")) {
		const [rawAlgo, hash] = document.currentScript.integrity.split("-");

		const algo = rawAlgo.replace(/^sha/g, "SHA-");

		alert(algo);

		const buf = new TextEncoder().encode(document.currentScript.innerHTML);

		const calcHashBuf = await crypto.subtle.digest(algo, buf);

		const calcHash = new TextDecoder().decode(calcHashBuf);

		// If mismatched hash
		const blocked = hash === calcHash;

		// Exit script
		if (blocked)
			// TODO: Error emulation
			throw new Error("Script blocked")
	}
})();
`;

		// Scope the scripts
		body += scope(await resp.text());
	} else if (req.destination === "manifest") {
		// Safari exclusive
		if (flags.legacy && type.contains("text/cache-manifest")) {
			const isFirefox = reqHeaders["user-agent"].includes("Firefox");

			body = rewriteCacheManifest(isFirefox);
		} else body = rewriteManifest(await resp.text());
	}
	// Nests
	else if (flags.nestedWorkers && req.destination === "worker")
		body = isMod
			? `
import { proxyLocation } from "${aeroPrefix}worker/worker.js";
self.location = proxyLocation;
`
			: `
importScripts("${aeroPrefix}worker/worker.js");

${body}
		`;
	else if (flags.nestedWorkers && req.destination === "sharedworker")
		body = isMod
			? `
import { proxyLocation } from "${aeroPrefix}worker/worker.js";
self.location = proxyLocation;
`
			: `
importScripts("${aeroPrefix}worker/worker.js");
importScripts("${aeroPrefix}worker/sharedworker.js");
	
${body}
		`;
	else if (flags.nestedWorkers && req.destination === "serviceworker")
		body = isMod
			? `
import { proxyLocation } from "${aeroPrefix}workerApis/worker.js";
self.location = proxyLocation;
`
			: `
importScripts("${aeroPrefix}worker/worker.js");
importScripts("${aeroPrefix}worker/sw.js");

${body}
		`;
	// No rewrites are needed; proceed as normal
	else body = resp.body;

	rewriteRespHeaders["x-aero-size-transfer"] = null;
	rewriteRespHeaders["x-aero-size-encbody"] = null;

	// TODO: x-aero-size-transfer
	if (typeof body === "string") {
		rewriteRespHeaders["x-aero-size-body"] = new TextEncoder().encode(
			body
		).length;
		// TODO: x-aero-size-encbody
	} else if (typeof body === "ArrayBuffer") {
		rewriteRespHeaders["x-aero-size-body"] = body.byteLength;
		// TODO: x-aero-size-encbody
	}

	const proxyResp = new Response(body, {
		status: resp.status ?? 200,
		headers: rewrittenRespHeaders,
	});

	// Cache the response
	cache.set(reqUrl, proxyResp.clone());

	// Return the response
	return proxyResp;
}

export default handle;
