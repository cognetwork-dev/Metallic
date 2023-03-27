const createBareServer = require("@tomphttp/bare-server-node");

/**
 *
 * @param {import('express').Express} app
 */
function setupProxy(app) {
  const bareServer = createBareServer("/bare/");

  app.use((req, res, next) => {
    if (bareServer.shouldRoute(req)) {
      bareServer.routeRequest(req, res);
    } else next();
  });
}

module.exports = setupProxy;
