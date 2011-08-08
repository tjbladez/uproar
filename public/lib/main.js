(function() {
  ig.module('game.main').requires('impact.game', 'impact.font', 'impact.sound', 'plugins.impfaye').defines(function() {
    var Music;
    Music = ig.Game.extend({
      font: new ig.Font('media/font.png'),
      init: function() {
        this.faye = new ig.ImpFaye;
        this.subscription = this.faye.subscribe('play', this.musicHandler, this);
        this.handshake = false;
        return ig.input.bind(ig.KEY.ENTER, 'ok');
      },
      update: function() {
        this.parent();
        if (ig.input.pressed('ok')) {
          this.faye.publish('music', {
            action: 'handshake'
          });
          return this.handshake = true;
        }
      },
      draw: function() {
        this.parent();
        if (!this.handshake) {
          return this.message('Press Enter to establish connection');
        }
      },
      message: function(text) {
        return this.font.draw(text, ig.system.width / 2, 62, ig.Font.ALIGN.CENTER);
      },
      musicHandler: function(msg) {
        if (msg.action === 'play') {
          this.sound = new ig.Sound('media/sounds/' + msg.sound + '.*');
          return this.sound.play();
        }
      }
    });
    return ig.main('#canvas', Music, 60, 320, 240, 1);
  });
}).call(this);
