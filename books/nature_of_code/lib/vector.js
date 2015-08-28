class Vector {

	constructor(x, y) {
		this.x = x;
		this.y = y;
	}

	map(op) {
		return new Vector(op(this.x), op(this.y));
	}

	zip(v, op) {
		return new Vector(op(this.x, v.x), op(this.y, v.y));
	}

	scale(scalar) {
		return this.map((a) => a * scalar);
	}

	add(v) {
		return this.zip(v, (a, b) => a + b);
	}

	sub(v) {
		return this.zip(v, (a, b) => a - b);
	}

	div(divisor) {
		return this.map((a) => a / divisor);
	}

	mag() {
		return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
	}

	normalize() {
		var mag = this.mag();
		return (mag != 0) ? this.div(mag) : this;
	}

	setMag(newMag) {
		var curMag = this.mag();
		return this.scale(newMag / curMag);
	}

	limit(limitMag) {
		var curMag = this.mag();
		return (curMag > limitMag) ? this.setMag(limitMag) : this;
	}

}

module.exports = Vector;