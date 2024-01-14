declare global {
    interface Window {
        StompBoot: any;
    }
}

const stomp = new window.StompBoot({
    bare_server: "/bare/",
    directory: "/stomp/",
    loglevel: window.StompBoot.LOG_ERROR,
    codec: window.StompBoot.CODEC_XOR,
});

export { stomp };