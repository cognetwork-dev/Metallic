if (!self.__DIP) self.__DIP={};

self.__DIP.config = {
  prefix: '/dip/',
  encoding: 'xor',
  ws: true,
  cookies: true,
  worker: true,
  bare: {
    version: 2,
    path: '/bare/',
  }
};