function headersToObject(headers) {
	return Object.fromEntries(headers.entries());
}

export default headersToObject;
