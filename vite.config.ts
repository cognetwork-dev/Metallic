import { defineConfig } from 'vite';
import preact from '@preact/preset-vite';
import { ViteMinifyPlugin } from 'vite-plugin-minify';
import { createBareServer } from '@tomphttp/bare-server-node';
import wisp from "wisp-server-node";
//@ts-ignore
import { epoxyPath } from "@mercuryworkshop/epoxy-transport";
import { viteStaticCopy } from "vite-plugin-static-copy";
//@ts-ignore
import { generateFile } from './src/util/generateFileVite';
//@ts-ignore
import { generateThemes } from './src/util/generateThemes';
import themes from './src/themes.json';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    outDir: "build",
  },
  plugins: [
    viteStaticCopy({
      targets: [
        {
          src: `${epoxyPath}/**/*`.replace(/\\/g, "/"),
          dest: "epoxy",
          overwrite: false
        }
      ]
    }),
    {
      name: "server",
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
          if (req.url && req.url.endsWith("/wisp/")) {
            //@ts-ignore
            wisp.routeRequest(req, socket, head);
          } else if (bare.shouldRoute(req)) {
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
    preact()
  ],
})