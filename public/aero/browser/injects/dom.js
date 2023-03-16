new MutationObserver(mutations => {
	for (let mutation of mutations)
		if (mutation.type === "childList")
			for (let node of mutation.addedNodes)
				if (node.nodeType === Node.ELEMENT_NODE) $aero.rewrite(node);
				else if (mutation.type === "attributes")
					for (let attr of mutation.attributeName)
						$aero.rewrite(mutation.target, attr);
}).observe(document, {
	childList: true,
	subtree: true,
});
