/**
 * Example of serving static files and running a bare server.
 * This is a very common setup.
 */
import createBareServer from "@tomphttp/bare-server-node";
import http from "http";
import serveStatic from "serve-static";
import { fileURLToPath } from "url";

const httpServer = http.createServer();
const port = process.env.PORT || 8080;

// Run the Bare server in the /bare/ namespace. This will prevent conflicts between the static files and the bare server.
const bareServer = createBareServer("/bare/", {
  logErrors: false,
  localAddress: undefined,
  maintainer: {
    email: "tomphttp@sys32.dev",
    website: "https://github.com/tomphttp/",
  },
});

const serve = serveStatic(fileURLToPath(new URL("./build/", import.meta.url)), {
  fallthrough: false,
});

const fail = (req, res, err) => {
  res.writeHead(err?.statusCode || 500, {
    "Content-Type": "text/plain",
  });
  res.end(err?.stack);
};

httpServer.on("request", (req, res) => {
  if (bareServer.shouldRoute(req)) {
    bareServer.routeRequest(req, res);
  } else {
    serve(req, res, (err) => {
      if (err?.code === "ENOENT") {
        req.url = "/404.html";
        res.statusCode = 404;

        serve(req, res, (err) => fail(req, res, err));
      } else {
        fail(req, res, err);
      }
    });
  }
});

httpServer.on("upgrade", (req, socket, head) => {
  if (bareServer.shouldRoute(req)) {
    bareServer.routeUpgrade(req, socket, head);
  } else {
    socket.end();
  }
});

httpServer.on("listening", () => {
  const address = httpServer.address();

  console.log(
    `Metallic at http://${
      address.family === "IPv6" ? `[${address.address}]` : address.address
    }:${address.port}`
  );
});

httpServer.listen({
  port: port,
});
