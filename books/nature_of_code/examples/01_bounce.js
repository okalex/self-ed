var Vector = require('../lib/vector.js');
var Thing = require('../lib/thing.js');

var animReq = 0;

module.exports = {

	start: function() {
		var canvas = $('#canvas');

		var location = new Vector(100.0, 100.0);
		var velocity = new Vector(200.0, 300.0);
		var ball = new Thing(canvas, location, velocity);

		var lastRun = Date.now();

		function draw() {
			animReq = requestAnimationFrame(draw);
			ball.draw();
		}

		function run() {
			var timePassed = Date.now() - lastRun;

			var diff = velocity.scale(timePassed / 1000.0);
			var nextPos = ball.location.add(diff);

			if (nextPos.x < 0 || nextPos.x + ball.width() >= canvas.width()) ball.velocity.x *= -1;
			if (nextPos.y < 0 || nextPos.y + ball.height() >= canvas.height()) ball.velocity.y *= -1;

			diff = ball.velocity.scale(timePassed / 1000.0);
			ball.location = ball.location.add(diff);
			lastRun = Date.now();
		}

		setInterval(run, 5);
		draw();
	},

	stop: function() {
		if (animReq) {
			cancelAnimationFrame(animReq);
			animReq = 0;
		}
	}

};
