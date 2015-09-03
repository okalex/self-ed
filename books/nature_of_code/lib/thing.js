var Vector = require('./vector');

class Thing {

	constructor(world, location, velocity) {
		this.world = world;
		this.el = $('<div class="object circle red"></div>').appendTo(world);

		this.location = location;
		this.velocity = velocity;
	}

	draw() {
		this.el.css('left', this.location.x);
		this.el.css('top', this.location.y);
	}

	height() {
		return this.el.height();
	}

	width() {
		return this.el.width();
	}

}

module.exports = Thing;
