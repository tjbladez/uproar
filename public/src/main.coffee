ig.module(
 'game.main'
)
.requires(
	'impact.game',
	'impact.font',
	'impact.sound',
	'plugins.impfaye'
)
.defines ->
  Music = ig.Game.extend
    font: new ig.Font('media/font.png')
    init: ->
      @faye = new ig.ImpFaye
      @subscription = @faye.subscribe('play', @musicHandler, @)
      @handshake = false
      ig.input.bind(ig.KEY.ENTER, 'ok')
    update: ->
      @parent()
      if ig.input.pressed('ok')
        @faye.publish('music', {action: 'handshake'})
        @handshake = true
    draw: ->
      @parent()
      @message('Press Enter to establish connection') unless @handshake
    message: (text) ->
      @font.draw(text, ig.system.width/2, 62, ig.Font.ALIGN.CENTER)
    musicHandler: (msg) ->
      if msg.action is 'play' and not ig.soundManager.isPlaying
        @sound = new ig.Sound('media/sounds/'+msg.sound+'.*')
        @sound.play()
  ig.main('#canvas', Music, 60, 320, 240, 1)