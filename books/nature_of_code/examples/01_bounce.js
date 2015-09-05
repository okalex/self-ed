var Vector = require('../lib/vector.js');
var Thing = require('../lib/thing.js');

var animReq = 0;

module.exports = {

	start: function() {
		var canvas = $('#canvas');

		var location = new Vector(100.0, 100.0);
		var velocity = new Vector(200.0, 0.0);
		var acceleration = new Vector(0.0, 5.0);
		var ball = new Thing(canvas, location, velocity, acceleration);

		var lastUpdate = Date.now();

		function draw() {
			animReq = requestAnimationFrame(draw);
			ball.draw();
		}

		function update() {
			var timePassed = Date.now() - lastUpdate;
			ball.update(timePassed);
			lastUpdate = Date.now();
		}

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
