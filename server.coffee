express = require('express')
faye = require('faye')
server = express.createServer()
port = process.env.PORT || 3232
bayeux = new faye.NodeAdapter mount: '/faye', timeout: 45
client = bayeux.getClient()

server.configure ->
  server.set 'views', __dirname + '/views'
  server.use express.methodOverride()
  server.use express.bodyParser()
  server.use express.static(__dirname + '/public')
  server.use server.router

server.get '/', (req, res) ->
  res.render 'index.jade', locals: { title: 'Music'}

server.post '/play', (req, res) ->
  res.send("bad params", 400) unless req.body.sound?
  client.publish '/play', {action: 'play', sound: req.body.sound}
  res.send(200)

client.subscribe '/music', (msg) ->
  client.publish '/play', 'ready' if msg.action is 'handshake'

bayeux.attach server
server.listen port
