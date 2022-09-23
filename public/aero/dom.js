// I might have to use es2020 imports
//import { scope } from './scope.js';

const prefix = '/go/';

function scope(script) {
	return script;
}

function rewriteUrl(rawUrl) {
	console.log(rawUrl);

	console.log(location.href);

	let hostname = new URL(new URL(location.href).pathname.replace(new RegExp(`^(${prefix})`), '')).hostname;
	
	console.log(hostname);

	let url = rawUrl
	 	// /
		.replace(/^(\/)/g, `${prefix}/${hostname}/`)
		// ./
		.replace(/^(\.\/)/g, `./${hostname}/`);

	if (/^(https?:\/\/)/g.test(url))
		url = prefix + url;

	return url;
}

new MutationObserver((mutations, observer) => {
	//console.table(mutations);

	for (let mutation of mutations) {
		const addedNode = mutation.addedNodes[0];

		//console.time(addedNode.tagName);

		// This is the only way to detect blocked scripts by mismatched integrity
		if (addedNode instanceof HTMLScriptElement) {
			/*
			if (!addedNode.rewritten) {
				addedNode.rewritten = true;

				// Backup
				addedNode._nonce = addedNode.nonce;
				addedNode._integrity = addedNode.integrity;
				addedNode.removeAttribute('nonce');
				addedNode.removeAttribute('integrity');

				// Create clone
				const clone = document.createElement('script');
				
				if (addedNode.src)
					clone.setAttribute('src', addedNode.getAttribute('src'));
				if (addedNode.type)
					clone.setAttribute('type', addedNode.getAttribute('type'));
				if (addedNode.async)
					clone.type = addedNode.async;
				
				// Modify
				clone.innerHTML = scope(addedNode.innerText);

				// Insert
				addedNode.after(clone);

				// Remove
				addedNode.remove()
			}
			*/
		} else {
			const node = mutation.target;

			if (node.integrity) {
				node._integrity = node.integrity
				node.removeAttribute('integrity');
			}
			if (node.nonce) {
				node._nonce = node.nonce
				node.removeAttribute('nonce');
			}

			switch (node.tagName) {
			case 'A':
				if (node.href) {
					// Backup
					const href = node.getAttribute('href');

					node._href = href;

					node.setAttribute('href', rewriteUrl(href));
				}
				break;
			case 'FORM':
				if (node.action) {
					// Backup
					const action = node.getAttribute('action');

					node._action = action;

					node.setAttribute('action', rewriteUrl(action));
				}
				break;
			case 'LINK':
				if (node.rel === 'manifest' && node.href) {
					// TODO: Rewrite manifest
					// For now we will delete the href
					href = ''
					node.removeAttribute('href');
				}
				break;
			case 'META':
				switch (node.httpEquiv) {
					case 'content-security-policy':
						// TODO: Rewrite
						node.content = '';
					case 'refresh':
						node.content = node.content.replace(/[0-9]+;url=(.*)/g, `${prefix}/$1`)
				}
				break;
			}
		}
	}
}).observe(document, {
	childList: true,
	subtree: true
});