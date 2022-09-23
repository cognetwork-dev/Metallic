/*global __DIP,__uv$config,__osana$config*/
import { stomp } from "./proxy.js";

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
  url = searchURL(url);
  var type = localStorage.getItem("type") || "Ultraviolet";

  switch (type) {
    case "Ultraviolet":
      return "." + __uv$config.prefix + __uv$config.encodeUrl(url);
    case "Stomp":
      return "." + stomp.html(url);
    case "DIP":
      return "." + __DIP.config.prefix + __uv$config.encodeUrl(url);
    case "Osana":
      return "." + __osana$config.prefix + __osana$config.codec.encode(url);
    case "Aero":
      return "./go/" + url;
    default:
      return "." + __uv$config.prefix + __uv$config.encodeUrl(url);
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
      case "Osana":
        pageURL = page.contentWindow.location
          .toString()
          .split(page.contentWindow.__osana$config.prefix)[1];
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
