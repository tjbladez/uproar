ig.module(
 'plugins.impfaye'
)
.requires(
 'impact.impact'
)
.defines ->
  ig.ImpFaye = ig.Class.extend
    init: ->
      @client = new Faye.Client(window.location.href + 'faye')
      @client.handshake =>
        @clientId = @client.getClientId()
    publish: (channel, msg) ->
      msg.clientId = @clientId
      @client.publish('/'+channel, msg)
    subscribe: (channel, callback, scope) ->
      @client.subscribe('/'+channel, (msg)-> callback.call(scope, msg))
