# aero

Aero is a safe, developer friendly, and innovative interception proxy. Aero provides a good balance of excellent site support speed, while also having a clean and organized codebase. A deployable version can be found [here](https://github.com/ProxyHaven/aero-deploy)

# How to use aero

1. Make sure your backend serves an [aero](https://github.com/ProxyHaven/aero-backends) _recommended_ or a [TompHTTP Compatible Backend](https://github.com/tomphttp)
    > If you are using bare, run bare.sh
2. Make sure you included aero into your site
3. Create a service worker like this in the topmost directory

```js
import handle from "./aero/handle.js";
import "./aero/init.js";

self.addEventListener("install", () => self.skipWaiting());

self.addEventListener("fetch", async event =>
	event.respondWith(
		handle(event).catch(err => new Response(err.stack, { status: 500 }))
	)
);
```

4. Register the service worker in a script on your main page like this
   _This example uses our [sdk](https://github.com/ProxyHaven/aero-sdk); allowing you to safely manage deployments of multiple proxies, and supports dynamic config updates_

```js
import { proxyApi } from "./aero/config.js";

import ProxyManager from "./sdk/ProxyManager.js";

const proxyManager = new ProxyManager();

proxyManager.add("/sw.js", proxyApi);
```

# How aero works

## Precedence

Previously, proxies could barely handle more than one person, this was due to all the site's code being rewritten on the backend. Because the code was being rewritten on the backend, it required having to share backend rewrite code with frontend code. This was not only slow, but also allowed the possibility of Slowloris attacks against the proxies.

## Interception

aero takes a different approach by not only completely avoiding rewrites, but also by doing all the rewrites on the frontend with no parsers! This allows aero to avoid speed delays. It does this by intercepting requests through a service worker, where the request is routed to the while also injecting important scripts. This prevents the need to hook into code that previously needed to be rewritten to redirect requests saving time and resources. All of its conceptual methods are optimal.

## Extensibility

One of our strengths is Extensibility. This is done by making aero readable and customizable by anyone. Every aspect of it is documented. Even if you are not a programmer, you can understand how aero works. There are configs to control functionality - in order to have no compromises and allow those who can't write code to easily customize it. If you are a programmer, you will appreciate all the hooks and guiding variables we have to easily modify the code. We are working on an even better way of making extensions: event-driven middleware that takes advantage of its internals.

## HTML Interception

HTML is intercepted and rewritten through a Mutation Observer where important elements are rewritten. Script elements with inline code and elements with integrity values set need to be cloned due to the browser's security restrictions.

## Deep Scope Property Checking DSPC

Location objects are replaced with a fake Location api, and also in the case of the site trying to escape the location scoping bracket property accessors for certain objects are checked using our scope function that evaluates the expression in hopes of intercepting the attempted location or window call. Additionaly, this scoping is integrated into Eval, Function Class, and Reflect interceptors. _Support for this feature is enabled in flags_

## Cache Emulation

### HTTP Caches

HTTP caches are removed and replaced by a system using aero's own cache stores. This allows us to have caches stored for a specific origin. This is important for support since Clear-Site-Data deletes every origin's cache making aero otherwise detectable.

### Cache Manifests

aero rewrites the paths in the cache manfiests files

### Clear Site Data

Whenever this header is present a script is injected to aero that handles clearing the data since it can't be done in the SW itself

## Cors Emulation

Unlike other proxies that simply delete the cors policy and ignore it, aero abides by the intended security features by keeping them in place. Without Cors Emulation, sites can infer either the browser doesn't support modern security standards or that a proxy is being used. This means that the site would've been lacking support; no longer with aero! _Support for this feature is enabled in flags_

### SW Interception

aero has interceptors in other SWs to adhere to cache emulation and hide the fact real http caches aren't being used.

### Cors Testing

Aero sends an request to the site without the proxy in order to check if they would allow it

### Trusted Types

We support trusted types through interceptors. Aero simply do nothing because it already knows the is origin secure.
