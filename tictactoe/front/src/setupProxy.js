const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function (app) {
  app.use(
    createProxyMiddleware("ws://localhost:3000/api", {
      ws: true,
      secure: false,
      changeOrigin: true,
      target: "ws://localhost:8765",
    }),
  )
}
