/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

	var examples = __webpack_require__(1);
	var Case = __webpack_require__(5);

	$(document).ready(function () {

		var select = $('#example-select');
		var canvas = $('#canvas');

		/* Add examples to drop down */
		examples.keys().forEach(function (ex) {
			var _ex$match = ex.match(/\.\/(([0-9]+)_(.*)\.js)$/);

			var _ex$match2 = _slicedToArray(_ex$match, 4);

			var file = _ex$match2[1];
			var idxStr = _ex$match2[2];
			var name = _ex$match2[3];

			var idx = parseInt(idxStr);
			var html = '<option value="' + file + '">' + idx + '. ' + Case.title(name) + '</option>';
			select.append(html);
		});

		var curExample = null;
		select.change(function (event) {
			/* Teardown */
			canvas.empty();
			if (curExample) curExample.stop();

			var file = this.value;
			curExample = __webpack_require__(7)("./" + file);
			curExample.start();
		});
	});

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var map = {
		"./01_bounce.js": 2,
		"./02_steer.js": 9,
		"./03_follow.js": 10
	};
	function webpackContext(req) {
		return __webpack_require__(webpackContextResolve(req));
	};
	function webpackContextResolve(req) {
		return map[req] || (function() { throw new Error("Cannot find module '" + req + "'.") }());
	};
	webpackContext.keys = function webpackContextKeys() {
		return Object.keys(map);
	};
	webpackContext.resolve = webpackContextResolve;
	module.exports = webpackContext;
	webpackContext.id = 1;


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Vector = __webpack_require__(3);
	var Thing = __webpack_require__(4);

	var animReq = 0;

	module.exports = {

		start: function start() {
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

		stop: function stop() {
			if (animReq) {
				cancelAnimationFrame(animReq);
				animReq = 0;
			}
		}

	};

/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Vector = (function () {
		function Vector(x, y) {
			_classCallCheck(this, Vector);

			this.x = x;
			this.y = y;
		}

		_createClass(Vector, [{
			key: "map",
			value: function map(op) {
				return new Vector(op(this.x), op(this.y));
			}
		}, {
			key: "zip",
			value: function zip(v, op) {
				return new Vector(op(this.x, v.x), op(this.y, v.y));
			}
		}, {
			key: "scale",
			value: function scale(scalar) {
				return this.map(function (a) {
					return a * scalar;
				});
			}
		}, {
			key: "add",
			value: function add(v) {
				return this.zip(v, function (a, b) {
					return a + b;
				});
			}
		}, {
			key: "sub",
			value: function sub(v) {
				return this.zip(v, function (a, b) {
					return a - b;
				});
			}
		}, {
			key: "div",
			value: function div(divisor) {
				return this.map(function (a) {
					return a / divisor;
				});
			}
		}, {
			key: "mag",
			value: function mag() {
				return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
			}
		}, {
			key: "normalize",
			value: function normalize() {
				var mag = this.mag();
				return mag != 0 ? this.div(mag) : this;
			}
		}, {
			key: "setMag",
			value: function setMag(newMag) {
				var curMag = this.mag();
				return this.scale(newMag / curMag);
			}
		}, {
			key: "limit",
			value: function limit(limitMag) {
				var curMag = this.mag();
				return curMag > limitMag ? this.setMag(limitMag) : this;
			}
		}]);

		return Vector;
	})();

	module.exports = Vector;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var Vector = __webpack_require__(3);

	var Thing = (function () {
		function Thing(world, location, velocity, acceleration) {
			_classCallCheck(this, Thing);

			this.world = world;
			this.el = $('<div class="object circle red"></div>').appendTo(world);

			this.location = location;
			this.velocity = velocity;
			this.acceleration = acceleration;
			this.followee = null;
		}

		_createClass(Thing, [{
			key: 'update',
			value: function update(timePassed) {
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
		}, {
			key: 'draw',
			value: function draw() {
				this.el.css('left', this.location.x);
				this.el.css('top', this.location.y);
			}
		}, {
			key: 'height',
			value: function height() {
				return this.el.height();
			}
		}, {
			key: 'width',
			value: function width() {
				return this.el.width();
			}
		}, {
			key: 'follow',
			value: function follow(point) {
				this.followee = point;
			}
		}]);

		return Thing;
	})();

	module.exports = Thing;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;/*! Case - v1.2.1 - 2015-01-29
	* Copyright (c) 2015 Nathan Bubna; Licensed MIT, GPL */
	(function() {
	    "use strict";
	    var unicodes = function(s, prefix) {
	        prefix = prefix || '';
	        return s.replace(/(^|-)/g, '$1\\u'+prefix).replace(/,/g, '\\u'+prefix);
	    },
	    basicSymbols = unicodes('20-2F,3A-40,5B-60,7B-7E,A0-BF,D7,F7', '00'),
	    baseLowerCase = 'a-z'+unicodes('DF-F6,F8-FF', '00'),
	    baseUpperCase = 'A-Z'+unicodes('C0-D6,D8-DE', '00'),
	    improperInTitle = 'A|An|And|As|At|But|By|En|For|If|In|Of|On|Or|The|To|Vs?\\.?|Via',
	    regexps = function(symbols, lowers, uppers, impropers) {
	        symbols = symbols || basicSymbols;
	        lowers = lowers || baseLowerCase;
	        uppers = uppers || baseUpperCase;
	        impropers = impropers || improperInTitle;
	        return {
	            capitalize: new RegExp('(^|['+symbols+'])(['+lowers+'])', 'g'),
	            pascal: new RegExp('(^|['+symbols+'])+(['+lowers+uppers+'])', 'g'),
	            fill: new RegExp('['+symbols+']+(.|$)','g'),
	            sentence: new RegExp('(^\\s*|[\\?\\!\\.]+"?\\s+"?|,\\s+")(['+lowers+'])', 'g'),
	            improper: new RegExp('\\b('+impropers+')\\b', 'g'),
	            relax: new RegExp('([^'+uppers+'])(['+uppers+']*)(['+uppers+'])(?=['+lowers+']|$)', 'g'),
	            upper: new RegExp('^[^'+lowers+']+$'),
	            hole: /\s/,
	            room: new RegExp('['+symbols+']')
	        };
	    },
	    re = regexps(),
	    _ = {
	        re: re,
	        unicodes: unicodes,
	        regexps: regexps,
	        types: [],
	        up: String.prototype.toUpperCase,
	        low: String.prototype.toLowerCase,
	        cap: function(s) {
	            return _.up.call(s.charAt(0))+s.slice(1);
	        },
	        decap: function(s) {
	            return _.low.call(s.charAt(0))+s.slice(1);
	        },
	        fill: function(s, fill) {
	            return !s || fill == null ? s : s.replace(re.fill, function(m, next) {
	                return next ? fill + next : '';
	            });
	        },
	        prep: function(s, fill, pascal, upper) {
	            if (!s){ return s || ''; }
	            if (!upper && re.upper.test(s)) {
	                s = _.low.call(s);
	            }
	            if (!fill && !re.hole.test(s)) {
	                s = _.fill(s, ' ');
	            }
	            if (!pascal && !re.room.test(s)) {
	                s = s.replace(re.relax, _.relax);
	            }
	            return s;
	        },
	        relax: function(m, before, acronym, caps) {
	            return before + ' ' + (acronym ? acronym+' ' : '') + caps;
	        }
	    },
	    Case = {
	        _: _,
	        of: function(s) {
	            for (var i=0,m=_.types.length; i<m; i++) {
	                if (Case[_.types[i]](s) === s){ return _.types[i]; }
	            }
	        },
	        flip: function(s) {
	            return s.replace(/\w/g, function(l) {
	                return l == _.up.call(l) ? _.low.call(l) : _.up.call(l);
	            });
	        },
	        type: function(type, fn) {
	            Case[type] = fn;
	            _.types.push(type);
	        }
	    },
	    types = {
	        snake: function(s){ return Case.lower(s, '_'); },
	        constant: function(s){ return Case.upper(s, '_'); },
	        camel: function(s){ return _.decap(Case.pascal(s)); },
	        lower: function(s, fill) {
	            return _.fill(_.low.call(_.prep(s, fill)), fill);
	        },
	        upper: function(s, fill) {
	            return _.fill(_.up.call(_.prep(s, fill, false, true)), fill);
	        },
	        capital: function(s, fill) {
	            return _.fill(_.prep(s).replace(re.capitalize, function(m, border, letter) {
	                return border+_.up.call(letter);
	            }), fill);
	        },
	        pascal: function(s) {
	            return _.fill(_.prep(s, false, true).replace(re.pascal, function(m, border, letter) {
	                return _.up.call(letter);
	            }), '');
	        },
	        title: function(s) {
	            return Case.capital(s).replace(re.improper, function(small) {
	                return _.low.call(small);
	            });
	        },
	        sentence: function(s, names) {
	            s = Case.lower(s).replace(re.sentence, function(m, prelude, letter) {
	                return prelude + _.up.call(letter);
	            });
	            if (names) {
	                names.forEach(function(name) {
	                    s = s.replace(new RegExp('\\b'+Case.lower(name)+'\\b', "g"), _.cap);
	                });
	            }
	            return s;
	        }
	    };
	    
	    // TODO: Remove "squish" in a future breaking release.
	    types.squish = types.pascal;

	    for (var type in types) {
	        Case.type(type, types[type]);
	    }
	    // export Case (AMD, commonjs, or global)
	    var define = __webpack_require__(6);
	    !(__WEBPACK_AMD_DEFINE_FACTORY__ = (typeof module === "object" && module.exports ? module.exports = Case : this.Case = Case), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

	}).call(this);


/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = function() { throw new Error("define cannot be used indirect"); };


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var map = {
		"./01_bounce": 2,
		"./01_bounce.js": 2,
		"./02_steer": 9,
		"./02_steer.js": 9,
		"./03_follow": 10,
		"./03_follow.js": 10
	};
	function webpackContext(req) {
		return __webpack_require__(webpackContextResolve(req));
	};
	function webpackContextResolve(req) {
		return map[req] || (function() { throw new Error("Cannot find module '" + req + "'.") }());
	};
	webpackContext.keys = function webpackContextKeys() {
		return Object.keys(map);
	};
	webpackContext.resolve = webpackContextResolve;
	module.exports = webpackContext;
	webpackContext.id = 7;


/***/ },
/* 8 */,
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Vector = __webpack_require__(3);
	var Thing = __webpack_require__(4);

	var animReq = 0;

	var KEY_LEFT = 37;
	var KEY_UP = 38;
	var KEY_RIGHT = 39;
	var KEY_DOWN = 40;

	module.exports = {

	  start: function start() {
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

	    $(document).keydown(function (event) {

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

	    $(document).keyup(function (event) {
	      event.preventDefault();
	      ball.acceleration = new Vector(0.0, 0.0);
	    });

	    var lastUpdate = Date.now();
	    setInterval(update, 1);
	    draw();
	  },

	  stop: function stop() {
	    if (animReq) {
	      cancelAnimationFrame(animReq);
	      animReq = 0;
	    }
	  }

	};

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Vector = __webpack_require__(3);
	var Thing = __webpack_require__(4);

	var animReq = 0;

	module.exports = {

	  start: function start() {
	    var canvas = $('#canvas');

	    var mouse = new Vector(0.0, 0.0);
	    $(document).mousemove(function (event) {
	      mouse.x = event.pageX - parseInt(canvas.css('left'));
	      mouse.y = event.pageY - parseInt(canvas.css('top'));
	    });

	    var location = new Vector(100.0, 100.0);
	    var velocity = new Vector(0.0, 0.0);
	    var acceleration = new Vector(0.0, 0.0);
	    var ball = new Thing(canvas, location, velocity, acceleration);
	    ball.follow(mouse);

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

	  stop: function stop() {
	    if (animReq) {
	      cancelAnimationFrame(animReq);
	      animReq = 0;
	    }
	  }

	};

/***/ }
/******/ ]);