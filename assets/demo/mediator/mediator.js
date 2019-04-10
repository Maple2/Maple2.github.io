<link rel="stylesheet" class="aplayer-secondary-style-marker" href="\assets\css\APlayer.min.css"><script src="\assets\js\APlayer.min.js" class="aplayer-secondary-script-marker"></script>// Generated by CoffeeScript 1.4.0
(function() {
  var Player, mediator, scoreboard;

  Player = function(name) {
    this.points = 0;
    return this.name = name;
  };

  Player.prototype.play = function() {
    this.points++;
    return mediator.played();
  };

  scoreboard = {
    element: document.getElementById("results"),
    update: function(score) {
      var diff, key, msg, value;
      msg = '';
      for (key in score) {
        value = score[key];
        if (score.hasOwnProperty(key)) {
          msg = msg + ("<span><strong>" + key + "</strong>:" + value + "</span>");
        }
      }
      this.element.innerHTML = msg;
      diff = score.Home - score.Guest;
      if (diff > 15) {
        alert("Home Win!");
        return location.reload();
      } else if (diff < -15) {
        alert("Guest Win!");
        return location.reload();
      } else {
        return document.getElementById('barGuest').style.width = 150 + (diff * 10) + 'px';
      }
    }
  };

  mediator = {
    players: {},
    setup: function() {
      var players;
      players = this.players;
      players.home = new Player('Home');
      return players.guest = new Player('Guest');
    },
    played: function() {
      var players, score;
      players = this.players;
      score = {
        Home: players.home.points,
        Guest: players.guest.points
      };
      return scoreboard.update(score);
    },
    keypress: function(e) {
      var keycode;
      e = e || window.event;
      keycode = e.which;
      if (keycode === 102) {
        mediator.players.home.play();
        return;
      }
      if (keycode === 106) {
        mediator.players.guest.play();
      }
    }
  };

  mediator.setup();

  window.onkeypress = mediator.keypress;

}).call(this);
