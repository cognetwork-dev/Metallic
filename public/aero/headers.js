import { rewriteSetCookie } from './cookie.js';

const delHeaders = ['cache-control', 'content-security-policy', 'content-encoding', 'content-length', 'cross-origin-opener-policy', 'cross-origin-opener-policy-report-only', 'report-to', 'strict-transport-security', 'x-content-type-options', 'x-frame-options'];

function rewriteLocation(url) {	
	console.log(url);
	return 'http://localhost:3000/go/https://www.google.com/';
}

function filterHeaders(headers) {;	
	return headers;
	
	// Type safety >:)
	if (typeof headers === 'object')
		for (header of headers) {
			if (header in delHeaders)
				delete headers[headers]
			else if (header === 'location')
				header = rewriteLocation(header);
			//It might be better if instead of adding cookies on the site page itself the cookie data is appended to document.cookie; this would allow the use of the browser's localstorage and new async cookie api
			else if (header === 'cookie')
				header = rewriteGetCookie(header);
			else if (header === 'set-cookie')
				header = rewriteSetCookie(header);
		}
	
	return headers;
}

export { filterHeaders };