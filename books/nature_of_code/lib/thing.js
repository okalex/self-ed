var Vector = require('./vector');

class Thing {

	constructor(world, location, velocity, acceleration) {
		this.world = world;
		this.el = $('<div class="object circle red"></div>').appendTo(world);

		this.location = location;
		this.velocity = velocity;
		this.acceleration = acceleration;
    this.followee = null;
	}

	update(timePassed) {
    if (this.followee) {
      this.acceleration = this.followee.sub(this.location).scale(0.5).limit(5.0);
    }

		this.velocity = this.velocity.add(this.acceleration).limit(600.0);
		var diff = this.velocity.scale(timePassed / 1000.0);
		var nextPos = this.location.add(diff);

		if (nextPos.x < 0 || nextPos.x + this.width() >= this.world.width()) {
			this.velocity.x *= -.95;
		}
		if (nextPos.y < 0 || nextPos.y + this.height() >= this.world.height()) {
			this.velocity.y *= -.95;
		}

		diff = this.velocity.scale(timePassed / 1000.0);
		this.location = this.location.add(diff);
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

  follow(point) {
    this.followee = point;
  }

}

module.exports = Thing;
