(function() {
  ig.module('game.main').requires('impact.game', 'impact.font', 'impact.sound', 'plugins.impfaye').defines(function() {
    var Music;
    Music = ig.Game.extend({
      font: new ig.Font('media/font.png'),
      init: function() {
        var opts;
        opts = {
          onHandshake: this.subscribe
        };
        return this.faye = new ig.ImpFaye(this, opts);
      },
      subscribe: function() {
        return this.subscription = this.faye.subscribe('play', this.musicHandler, this);
      },
      update: function() {
        return this.parent();
      },
      draw: function() {
        this.parent();
        return this.message('You are good to go. Enjoy!');
      },
      message: function(text) {
        return this.font.draw(text, ig.system.width / 2, 62, ig.Font.ALIGN.CENTER);
      },
      musicHandler: function(msg) {
        if (msg.action === 'play' && !ig.soundManager.isPlaying) {
          this.sound = new ig.Sound('media/sounds/' + msg.sound + '.*');
          return this.sound.play();
        }
      }
    });
    return ig.main('#canvas', Music, 60, 320, 240, 1);
  });
}).call(this);
