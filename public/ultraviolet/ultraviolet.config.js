/*global Ultraviolet*/
self.__uv$config = {
    prefix: '/service1/',
    encodeUrl: Ultraviolet.codec.xor.encode,
    decodeUrl: Ultraviolet.codec.xor.decode,
    handler: '/ultraviolet/ultraviolet.handler.js',
    client: '/ultraviolet/ultraviolet.client.js',
    bundle: '/ultraviolet/ultraviolet.bundle.js',
    config: '/ultraviolet/ultraviolet.config.js',
    sw: '/ultraviolet/ultraviolet.sw.js',
};
