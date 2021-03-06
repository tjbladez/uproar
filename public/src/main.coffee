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
      opts = {onHandshake: @subscribe}
      @faye = new ig.ImpFaye(@, opts)
    subscribe: ->
      @subscription = @faye.subscribe('play', @musicHandler, @)
    update: ->
      @parent()
    draw: ->
      @parent()
      @message('You are good to go. Enjoy!')
    message: (text) ->
      @font.draw(text, ig.system.width/2, 62, ig.Font.ALIGN.CENTER)
    musicHandler: (msg) ->
      if msg.action is 'play' and not ig.soundManager.isPlaying
        @sound = new ig.Sound('media/sounds/'+msg.sound+'.*')
        @sound.play()
  ig.main('#canvas', Music, 60, 320, 240, 1)