function geSearchEngine(engine: string) {
    let newEngine = "";

    switch (engine) {
        case "google":
            newEngine = "https://www.google.com/search?q=%s"
            break;
        case "duckduckgo":
            newEngine = "https://duckduckgo.com/?q=%s&ia=web"
            break;
        case "bing":
            newEngine = "https://www.bing.com/search?q=%s"
            break;
        case "yahoo":
            newEngine = "https://search.yahoo.com/search?p=%s"
            break;
        case "brave":
            newEngine = "https://search.brave.com/search?q=%s"
            break;
        case "qwant":
            newEngine = "https://www.qwant.com/?q=%s&t=web"
            break;
        case "searxng":
            newEngine = "https://searx.si/search?q=%s"
            break;
        case "ecosia":
            newEngine = "https://www.ecosia.org/search?method=index&q=%s"
            break;
    }

    return newEngine;
}

export { geSearchEngine };