import { rammerheadEncode } from "./rammerheadEncode";
import { stomp } from "./stomp";

declare global {
    interface Window {
        location: Location;
        __uv$config: any;
        __dynamic$config: any;
    }
}

async function encodeURL(input: any, service: string) {
    switch (service) {
        case "ultraviolet":
            input = window.location.origin + window.__uv$config.prefix + window.__uv$config.encodeUrl(input)
            break;
        case "dynamic":
            input = window.location.origin + window.__dynamic$config.prefix + window.__uv$config.encodeUrl(input)
            break;
        case "rammerhead":
            input = window.location.origin + await rammerheadEncode(input);
            break;
        case "stomp":
            //@ts-ignore
            input = new URL(stomp.html(input), window.location).toString()
            break;
    }

    return input;
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