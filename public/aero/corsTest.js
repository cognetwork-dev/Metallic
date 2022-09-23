function block(url) {
    /*
    try {
        const controller = new AbortController();
        const signal = controller.signal;

        await fetch(url, { signal });

        // Don't actually send the request.
        controller.abort()
    } catch (err) {
        if (err.name !== 'AbortError')
            return false;
    }
    */

    return false;
}

export { block };