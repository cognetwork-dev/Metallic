/**
 *
 * @param {import('express').Express} app
 */
function setupProxy(app) {
  try {
    const bareServer = import("@tomphttp/bare-server-node").then(
      ({ default: createBareServer }) => createBareServer("/bare/")
    );

    app.use(async (req, res, next) => {
      if ((await bareServer).shouldRoute(req)) {
        (await bareServer).routeRequest(req, res);
      } else next();
    });
  } catch (e) {
    console.error(e);
  }
}

module.exports = setupProxy;
