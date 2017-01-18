'use strict';
const proxyServer = require('http-route-proxy');
const app         = require('express')();
const serveStatic = require('serve-static');

app.use(serveStatic('dist'));
app.use('/', proxyServer.connect({
  to:    'api.nestoria.co.uk',
  https: false,
  route: ['/']
}));

app.listen(8000, function () {
  console.log('Example app listening on port 8000!');
});

