var Vector = require('../lib/vector.js');
var Thing = require('../lib/thing.js');

var animReq = 0;

var KEY_LEFT  = 37;
var KEY_UP    = 38;
var KEY_RIGHT = 39;
var KEY_DOWN  = 40;

module.exports = {

  start: function() {
    var canvas = $('#canvas');

    var location = new Vector(100.0, 100.0);
    var velocity = new Vector(0.0, 0.0);
    var acceleration = new Vector(0.0, 0.0);
    var ball = new Thing(canvas, location, velocity, acceleration);

    function draw() {
      animReq = requestAnimationFrame(draw);
      ball.draw();
    }

    function update() {
      var timePassed = Date.now() - lastUpdate;
      ball.update(timePassed);
      lastUpdate = Date.now();
    }

    $(document).keydown(function(event) {

      var ACCEL = 2.0;

      switch (event.which) {
        case KEY_UP:
          event.preventDefault();
          ball.acceleration = new Vector(0.0, -ACCEL);
          break;

        case KEY_DOWN:
          event.preventDefault();
          ball.acceleration = new Vector(0.0, ACCEL);
          break;

        case KEY_LEFT:
          event.preventDefault();
          ball.acceleration = new Vector(-ACCEL, 0.0);
          break;

        case KEY_RIGHT:
          event.preventDefault();
          ball.acceleration = new Vector(ACCEL, 0.0);
          break;
      }

    });

    $(document).keyup(function(event) {
      event.preventDefault();
      ball.acceleration = new Vector(0.0, 0.0);
    });

    var lastUpdate = Date.now();
    setInterval(update, 1);
    draw();
  },

  stop: function() {
    if (animReq) {
      cancelAnimationFrame(animReq);
      animReq = 0;
    }
  }

};
