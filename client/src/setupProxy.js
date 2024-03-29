const { createProxyMiddleware } = require('http-proxy-middleware');

const dotenv = require('dotenv')

dotenv.config()

const port = ( process.env.PROXY_SERVER_PORT === undefined ) ? 3001 :  process.env.PROXY_SERVER_PORT;

module.exports = app => {
  app.use(
    createProxyMiddleware('/api', {
      target: 'http://localhost:'.concat(port),
      changeOrigin: false
    })
  );
};