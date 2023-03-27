/*window __DIP,__uv$config*/
import { stomp, swSupported } from "./proxy.jsx";

export function getSearchEngine() {
  var engine = localStorage.getItem("engine");

  switch (engine) {
    case "DuckDuckGo":
      return "https://duckduckgo.com/?q=";
    case "Bing":
      return "https://www.bing.com/search?q=";
    case "Brave":
      return "https://search.brave.com/search?q=";
    default:
    case "Google":
      return "https://www.google.com/search?a=";
  }
}

function searchURL(url) {
  if (url.match(/^https?:\/\//)) {
    return url;
  } else if (url.includes(".") && !url.includes(" ")) {
    return "https://" + url;
  } else {
    return getSearchEngine() + encodeURIComponent(url);
  }
}

export function getLink(url) {
  if (!swSupported)
    throw new Error("Your browser doesn't support service workers.");

  url = searchURL(url);
  var type = localStorage.getItem("type") || "Ultraviolet";

  switch (type) {
    case "Stomp":
      return new URL(stomp.html(url), window.location).toString();
    case "DIP":
      return new URL(
        __uv$config.encodeUrl(url),
        new URL(__DIP.config.prefix, window.location)
      ).toString();
    case "Aero":
      return new URL(
        `/go/${url}`,
        window.location
      ).toString();
    default:
    case "Ultraviolet":
      return new URL(
        __uv$config.encodeUrl(url),
        new URL(__uv$config.prefix, window.location)
      ).toString();
  }
}

export function getWindowLocation(page) {
  var [type] = localStorage.getItem("type") || "Ultraviolet";

  var pageURL = page.contentWindow.location.toString();

  try {
    switch (type) {
      case "Ultraviolet":
        pageURL = page.contentWindow.__uv$location.toString();
        break;
      case "Stomp":
        pageURL = page.contentWindow.tc$.access
          .get2(page.contentWindow, "location", "(window.location)")
          .toString();
        break;
      case "DIP":
        pageURL = page.contentWindow.__DIP.location.toString();
        break;
      case "Aero":
        pageURL = page.contentWindow.location.toString().split("/go/")[1];
        break;
      default:
        pageURL = page.contentWindow.__uv$location.toString();
        break;
    }
  } catch {}
  return pageURL;
}
