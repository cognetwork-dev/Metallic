declare global {
    interface Window {
        location: Location;
        __uv$config: any;
        __dynamic$config: any;
    }
}

async function searchURL(input: string, service: string, searchEngine: string) {
    if (input.match(/^https?:\/\//)) {
        //@ts-ignore
        return await chemicalEncode(input, service);
    } else if (input.includes(".") && !input.includes(" ")) {
        //@ts-ignore
        return await chemicalEncode("https://" + input, service);
    } else {
        //@ts-ignore
        return await chemicalEncode(searchEngine.replace("%s", encodeURIComponent(input)), service);
    }
}
export { searchURL };