/**
 * Example of serving static files and running a bare server.
 * This is a very common setup.
 */
import createBareServer from "@tomphttp/bare-server-node";
import http from "http";
import serveStatic from "serve-static";
import { fileURLToPath } from "url";
import chalk from "chalk";
import block from "./blocklist/block.json" assert { type: "json" };

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
    if (block.includes(req.headers["x-bare-host"])) {
      return res.end(`{
          "id": "error.Blocked",
          "message": "Header was blocked by the owner of this site.",
      `);
    }
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

  var theme = chalk.hex('#004953');
  console.log(`${chalk.bold(theme('Metallic'))}`)

  console.log(
    `  ${chalk.bold('Local:')}            http://${address.family === 'IPv6' ? `[${address.address}]` : addr.address}${address.port === 80 ? '' : ':' + chalk.bold(address.port)}`
  );

  console.log(
    `  ${chalk.bold('Local:')}            http://localhost${address.port === 80 ? '' : ':' + chalk.bold(address.port)}`
  );

  try {
    console.log(
      `  ${chalk.bold('On Your Network:')}  http://${address.ip()}${address.port === 80 ? '' : ':' + chalk.bold(address.port)}`
    );
  } catch (err) {
    // can't find LAN interface
  }

  if (process.env.REPL_SLUG && process.env.REPL_OWNER) {
    console.log(
      `  ${chalk.bold('Replit:')}           https://${process.env.REPL_SLUG}.${process.env.REPL_OWNER}.repl.co`
    );
  }

  if (process.env.HOSTNAME && process.env.GITPOD_WORKSPACE_CLUSTER_HOST) {
    console.log(
      `  ${chalk.bold('Gitpod:')}           https://${port}-${process.env.HOSTNAME}.${process.env.GITPOD_WORKSPACE_CLUSTER_HOST}`
    );
  }

});

httpServer.listen({
  port: port,
});