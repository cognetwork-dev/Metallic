import { defineConfig } from 'vite';
import preact from '@preact/preset-vite';
import million from 'million/compiler';
import { ViteMinifyPlugin } from 'vite-plugin-minify';
import { createBareServer } from '@tomphttp/bare-server-node';
//@ts-ignore
import { generateFile } from './util/generateFileVite';
//@ts-ignore
import { generateThemes } from './util/generateThemes';
import themes from './themes.json';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    outDir: "build",
  },
  plugins: [
    {
      name: "bare server",
      configureServer(server) {
        const bare = createBareServer("/bare/");
        server.middlewares.use((req, res, next) => {
          if (bare.shouldRoute(req)) bare.routeRequest(req, res);
          else next();
        });

        const upgraders = server.httpServer.listeners(
          "upgrade"
        ) as Parameters<(typeof server)["httpServer"]["on"]>[1][];

        // remover other listeners
        for (const upgrader of upgraders) {
          server.httpServer.off("upgrade", upgrader);
        }

        server.httpServer.on("upgrade", (req, socket, head) => {
          if (bare.shouldRoute(req)) {
            bare.routeUpgrade(req, socket, head);
          } else {
            for (const upgrader of upgraders) {
              //@ts-ignore
              upgrader(req, socket, head);
            }
          }
        });
      },
    },
    generateFile([{
      contentType: 'text/css',
      output: 'themes.css',
      data: generateThemes(themes)
    }]),
    ViteMinifyPlugin(),
    million.vite({ auto: true, mute: true }),
    preact()
  ],
})