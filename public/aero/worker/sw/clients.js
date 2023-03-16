// TODO: Finish all the apis

var oldClientsGet = Clients.get;
Clients.get = async id => {
	const client = await oldClientsGet(id);

	client.url = client.url.match(
		new RegExp(`^(${$aero.config.prefix})/*`, "g")
	)[0];

	return client;
};
