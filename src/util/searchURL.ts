function searchURL(input: string, searchEngine: string) {
    if (input.match(/^https?:\/\//)) {
        return input;
    } else if (input.includes(".") && !input.includes(" ")) {
        return "https://" + input;
    } else {
        return searchEngine.replace("%s", encodeURIComponent(input));
    }
}

export { searchURL };