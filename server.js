(function() {
  var bayeux, client, express, faye, port, server;
  express = require('express');
  faye = require('faye');
  server = express.createServer();
  port = process.env.PORT || 3232;
  bayeux = new faye.NodeAdapter({
    mount: '/faye',
    timeout: 45
  });
  client = bayeux.getClient();
  server.configure(function() {
    server.set('views', __dirname + '/views');
    server.use(express.methodOverride());
    server.use(express.bodyParser());
    server.use(express.static(__dirname + '/public'));
    return server.use(server.router);
  });
  server.get('/', function(req, res) {
    return res.render('index.jade', {
      locals: {
        title: 'Music'
      }
    });
  });
  server.post('/play', function(req, res) {
    if (req.body.sound == null) {
      res.send("bad params", 400);
    }
    client.publish('/play', {
      action: 'play',
      sound: req.body.sound
    });
    return res.send(200);
  });
  bayeux.attach(server);
  server.listen(port);
}).call(this);
