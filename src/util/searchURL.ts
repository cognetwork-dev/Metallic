import { rammerheadEncode } from "./rammerheadEncode";
import { stomp } from "./stomp";

declare global {
    interface Window {
        location: Location;
        __uv$config: any;
        __dynamic$config: any;
    }
}

async function encodeURL(input: string, service: string) {
    let result;

    switch (service) {
        case "ultraviolet":
            result = window.location.origin + window.__uv$config.prefix + window.__uv$config.encodeUrl(input)
            break;
        case "dynamic":
            result = window.location.origin + window.__dynamic$config.prefix + window.__uv$config.encodeUrl(input)
            break;
        case "rammerhead":
            result = window.location.origin + await rammerheadEncode(input);
            break;
        case "stomp":
            //@ts-ignore
            result = new URL(stomp.html(input), window.location).toString()
            break;
    }

    return result;
}

async function searchURL(input: string, service: string, searchEngine: string) {
    if (input.match(/^https?:\/\//)) {
        return await encodeURL(input, service);
    } else if (input.includes(".") && !input.includes(" ")) {
        return await encodeURL("https://" + input, service);
    } else {
        return await encodeURL(searchEngine.replace("%s", encodeURIComponent(input)), service);
    }
}
export { searchURL };