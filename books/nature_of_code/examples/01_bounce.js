var Vector = require('../lib/vector.js');

var animReq = 0;

module.exports = {

	start: function() {
		var canvas = $('#canvas');
		canvas.append('<div class="object circle red"></div>');

		var circle = $('.circle').first();
		var velocity = new Vector(225.0, 275.0);

		var lastDraw = Date.now();
		var timePassed = 0;

		function draw() {
			animReq = requestAnimationFrame(draw);

			timePassed = Date.now() - lastDraw;

			var curPos = new Vector(parseInt(circle.css('left')), parseInt(circle.css('top')));
			var diff = velocity.scale(timePassed / 1000.0);
			var nextPos = curPos.add(diff);

			if (nextPos.x < 0 || nextPos.x + circle.width() >= canvas.width()) velocity.x *= -1;
			if (nextPos.y < 0 || nextPos.y + circle.height() >= canvas.height()) velocity.y *= -1;

			diff = velocity.scale(timePassed / 1000.0);
			nextPos = curPos.add(diff);
			circle.css('left', nextPos.x);
			circle.css('top', nextPos.y);

			lastDraw = Date.now();
		}

		draw();
	},

	stop: function() {
		if (animReq) {
			cancelAnimationFrame(animReq);
			animReq = 0;
		}
	}

};
