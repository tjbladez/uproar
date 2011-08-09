(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  ig.module('plugins.impfaye').requires('impact.impact').defines(function() {
    return ig.ImpFaye = ig.Class.extend({
      init: function(subscriber, opts) {
        this.subscriber = subscriber;
        this.client = new Faye.Client(window.location.href + 'faye');
        return this.client.handshake(__bind(function() {
          this.clientId = this.client.getClientId();
          if (opts.onHandshake) {
            return opts.onHandshake.call(this.subscriber);
          }
        }, this));
      },
      publish: function(channel, msg) {
        msg.clientId = this.clientId;
        return this.client.publish('/' + channel, msg);
      },
      subscribe: function(channel, callback, scope) {
        return this.client.subscribe('/' + channel, function(msg) {
          return callback.call(scope, msg);
        });
      }
    });
  });
}).call(this);
