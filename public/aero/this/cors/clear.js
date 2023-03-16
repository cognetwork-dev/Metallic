export default async (clear, id) => {
	if (clear.includes("'*'") || clearincludes("'cache'"))
		await cache.clear(proxyUrl.origin);
	// Send messages to all windows with the same origin to reload
	if (
		(flags.experimental && clear.includes("'*'")) ||
		clear.includes("executionContexts")
	)
		for (const client of await clients.get(id)) {
			const clientOrigin = new URL(
				client.url.replace(new RegExp(`^(${prefix})`, "g"), "")
			).origin;

			if (clientOrigin === proxyUrl.origin)
				client.postMessage("clearExecutionContext");
		}
};
