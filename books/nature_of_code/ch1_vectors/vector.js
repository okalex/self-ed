$(document).ready(function() {

	var canvas = $('.canvas')
	canvas.append('<div class="object circle red"></div>');
	var controls = {
		start: $('.controls .start').first(),
		stop:  $('.controls .stop').first()
	};
	console.log(controls);
	var circle = $('.circle').first();
	var velocity = new Vector(400.0, 300.0);

	var lastDraw = Date.now();
	var timePassed = 0;
	function draw() {
		requestAnimationFrame(draw);
		timePassed = Date.now() - lastDraw;

		var curPos = new Vector(parseInt(circle.css('left')), parseInt(circle.css('top')));
		var diff = velocity.scale(timePassed / 1000.0);
		var nextPos = curPos.add(diff);

		if (nextPos.x < 0 || nextPos.x + circle.width() >= canvas.width()) velocity.x *= -1;
		circle.css('left', curPos.add(diff).x);

		if (nextPos.y < 0 || nextPos.y + circle.height() >= canvas.height()) velocity.y *= -1;
		circle.css('top', curPos.add(diff).y);

		lastDraw = Date.now();
	}
	draw();

	// var interval = null;
	// controls.start.click(function(e) {
	// 	console.log('start');
	// 	if (!interval) {
	// 		interval = setInterval(render, 50);
	// 	}
	// 	e.preventDefault();
	// })
	// controls.stop.click(function(e) {
	// 	console.log('stop');
	// 	if (interval) {
	// 		clearInterval(interval);
	// 		interval = null;
	// 	}
	// 	e.preventDefault();
	// })

});

function Vector(x, y) {
	this.x = x;
	this.y = y;

	this.scale = function(scalar) {
		return new Vector(this.x * scalar, this.y * scalar);
	}

	this.add = function(b) {
		return new Vector(this.x + b.x, this.y + b.y);
	}
}
