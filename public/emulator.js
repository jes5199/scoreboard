/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Pixels = function () {
  function Pixels() {
    _classCallCheck(this, Pixels);

    this.dataByChannel = {};
  }

  _createClass(Pixels, [{
    key: "set",
    value: function set(ch, n, rgba) {
      if (this.dataByChannel[ch] === undefined) {
        this.dataByChannel[ch] = [];
      }
      var channelData = this.dataByChannel[ch];

      channelData[n] = rgba;
    }
  }, {
    key: "mask",
    value: function mask(that) {
      var result = new Pixels();
      for (var ch in this.dataByChannel) {
        if (ch in that.dataByChannel) {
          var len = Math.min(this.dataByChannel[ch].length, that.dataByChannel[ch].length);
          for (var i = 0; i < len; i++) {
            var thisC = this.dataByChannel[ch][i];
            var thatC = that.dataByChannel[ch][i];
            if (thisC && thatC) {
              var alpha = thisC[3];
              var r = thatC[0] * alpha;
              var g = thatC[1] * alpha;
              var b = thatC[2] * alpha;
              var a = alpha;
              result.set(ch, i, [r, g, b, a]);
            }
          }
        }
      }
      return result;
    }
  }, {
    key: "combine",
    value: function combine(that) {
      var result = new Pixels();
      for (var ch in this.dataByChannel) {
        if (!(ch in that.dataByChannel)) {
          result.dataByChannel[ch] = this.dataByChannel[ch];
        } else {
          var len = Math.max(this.dataByChannel[ch].length, that.dataByChannel[ch].length);
          for (var i = 0; i < len; i++) {
            var thisC = this.dataByChannel[ch][i];
            var thatC = this.dataByChannel[ch][i];
            if (!thisC) {
              result.set(ch, i, thatC);
            } else if (!thatC) {
              result.set(ch, i, thisC);
            } else {
              var alpha = thisC[3];
              var r = thisC[0] * alpha + thatC[0] * (1 - alpha);
              var g = thisC[1] * alpha + thatC[1] * (1 - alpha);
              var b = thisC[2] * alpha + thatC[2] * (1 - alpha);
              var a = thatC[3];
              result.set(ch, i, [r, g, b, a]);
            }
          }
        }
      }
      for (ch in that.dataByChannel) {
        if (!(ch in this.dataByChannel)) {
          result.dataByChannel[ch] = that.dataByChannel[ch];
        }
      }
      return result;
    }
  }, {
    key: "write",
    value: function write(channels) {
      for (var ch in this.dataByChannel) {
        var channel = channels[ch];
        var data = this.dataByChannel[ch];
        if (channel) {
          for (var i = 0; i < data.length; i++) {
            if (data[i]) {
              channel.colors[i * 3 + 0] = data[i][0] * 255;
              channel.colors[i * 3 + 1] = data[i][1] * 255;
              channel.colors[i * 3 + 2] = data[i][2] * 255;
            }
          }
        }
      }
    }
  }]);

  return Pixels;
}();

exports.default = Pixels;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// Represents a 2.5 digit 7-segment display
// where each segment is LEDs arranged like so:
//   o
// o o o
// o o o
// o o o
// o o o
// o o o
// o o o
// o o o
//   o

var SegmentOffset = [[0, 3], [0, 13], [11, 0], [20, 3], [20, 13], [11, 21], [8, 13], [8, 3], [11, 11], [22, 0], [31, 3], [31, 13], [22, 21], [19, 13], [19, 3], [22, 11]];

var NumberDisplay = function () {
  // current assumption is that each NumberDisplay is on a single, unique OPC segment
  // and all NumberDisplays are on the same OPC device
  function NumberDisplay(channel, segments) {
    _classCallCheck(this, NumberDisplay);

    // TODO: assert that we have the right number of segments
    this.channel = channel;
    this.segments = segments;
    this.segmentCount = 2 + 7 + 7;
    this.segmentPixelCount = 7 + 9 + 7;
    this.colorCount = 3;
    this.number = 0;
  }

  _createClass(NumberDisplay, [{
    key: "update",
    value: function update(number) {
      this.number = number;
    }
  }, {
    key: "paint",
    value: function paint(pixels, f) {
      for (var i = 0; i < this.segmentCount; i++) {
        this.segments[i].paint(pixels, function (x, y) {
          var offset = SegmentOffset[i];
          return f(x + offset[0], y + offset[1]);
        });
      }
    }
  }]);

  return NumberDisplay;
}();

exports.default = NumberDisplay;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Scoreboard = __webpack_require__(5);

var _Scoreboard2 = _interopRequireDefault(_Scoreboard);

var _OpcChannel = __webpack_require__(4);

var _OpcChannel2 = _interopRequireDefault(_OpcChannel);

var _Segment = __webpack_require__(6);

var _Segment2 = _interopRequireDefault(_Segment);

var _NumberDisplay = __webpack_require__(1);

var _NumberDisplay2 = _interopRequireDefault(_NumberDisplay);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var WiringDiagram = function WiringDiagram(opcHost) {
  _classCallCheck(this, WiringDiagram);

  this.opcHost = opcHost;
  this.leftOpcChannel = new _OpcChannel2.default(this.opcHost, 0, 368);
  this.rightOpcChannel = new _OpcChannel2.default(this.opcHost, 1, 368);

  var ledsInSegment = 7 + 9 + 7;

  this.leftDisplay = new _NumberDisplay2.default(this.leftOpcChannel, [
  // 100s
  new _Segment2.default(this.leftOpcChannel, 0 * ledsInSegment, true), new _Segment2.default(this.leftOpcChannel, 1 * ledsInSegment, true),

  // 10s
  new _Segment2.default(this.leftOpcChannel, 2 * ledsInSegment, false), new _Segment2.default(this.leftOpcChannel, 3 * ledsInSegment, true), new _Segment2.default(this.leftOpcChannel, 4 * ledsInSegment, true), new _Segment2.default(this.leftOpcChannel, 5 * ledsInSegment, false), new _Segment2.default(this.leftOpcChannel, 6 * ledsInSegment, true), new _Segment2.default(this.leftOpcChannel, 7 * ledsInSegment, true), new _Segment2.default(this.leftOpcChannel, 8 * ledsInSegment, false),

  // 1s
  new _Segment2.default(this.leftOpcChannel, 9 * ledsInSegment, false), new _Segment2.default(this.leftOpcChannel, 10 * ledsInSegment, true), new _Segment2.default(this.leftOpcChannel, 11 * ledsInSegment, true), new _Segment2.default(this.leftOpcChannel, 12 * ledsInSegment, false), new _Segment2.default(this.leftOpcChannel, 13 * ledsInSegment, true), new _Segment2.default(this.leftOpcChannel, 14 * ledsInSegment, true), new _Segment2.default(this.leftOpcChannel, 15 * ledsInSegment, false)]);

  this.rightDisplay = new _NumberDisplay2.default(this.rightOpcChannel, [
  // 100s
  new _Segment2.default(this.rightOpcChannel, 0 * ledsInSegment, true), new _Segment2.default(this.rightOpcChannel, 1 * ledsInSegment, true),

  // 10s
  new _Segment2.default(this.rightOpcChannel, 2 * ledsInSegment, false), new _Segment2.default(this.rightOpcChannel, 3 * ledsInSegment, true), new _Segment2.default(this.rightOpcChannel, 4 * ledsInSegment, true), new _Segment2.default(this.rightOpcChannel, 5 * ledsInSegment, false), new _Segment2.default(this.rightOpcChannel, 6 * ledsInSegment, true), new _Segment2.default(this.rightOpcChannel, 7 * ledsInSegment, true), new _Segment2.default(this.rightOpcChannel, 8 * ledsInSegment, false),

  // 1s
  new _Segment2.default(this.rightOpcChannel, 9 * ledsInSegment, false), new _Segment2.default(this.rightOpcChannel, 10 * ledsInSegment, true), new _Segment2.default(this.rightOpcChannel, 11 * ledsInSegment, true), new _Segment2.default(this.rightOpcChannel, 12 * ledsInSegment, false), new _Segment2.default(this.rightOpcChannel, 13 * ledsInSegment, true), new _Segment2.default(this.rightOpcChannel, 14 * ledsInSegment, true), new _Segment2.default(this.rightOpcChannel, 15 * ledsInSegment, false)]);

  this.scoreboard = new _Scoreboard2.default(this.leftDisplay, this.rightDisplay);
};

exports.default = WiringDiagram;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _WiringDiagram = __webpack_require__(2);

var _WiringDiagram2 = _interopRequireDefault(_WiringDiagram);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

document.leftColors = [];
document.rightColors = [];

var fakeHost = {
  connect: function connect() {},
  sendPixels: function sendPixels(channel, colors) {
    colors = Array.from(colors);
    if (channel == 0) {
      document.leftColors = colors;
    } else {
      document.rightColors = colors;
    }
  }
};

var scoreboard = new _WiringDiagram2.default(fakeHost).scoreboard;
scoreboard.start();

document.setLeft = function (x) {
  scoreboard.setLeft(x);
};

document.setRight = function (x) {
  scoreboard.setRight(x);
};

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var OpcChannel = function () {
  function OpcChannel(opcHost, channelNumber, length) {
    _classCallCheck(this, OpcChannel);

    this.opcHost = opcHost;
    this.channelNumber = channelNumber;
    this.length = length;
    this.colorCount = 3;
    this.colors = new Uint8ClampedArray(this.length * this.colorCount);

    this.second = 0;
    this.frameCount = 0;
  }

  _createClass(OpcChannel, [{
    key: "setPixels",
    value: function setPixels(offset, colors) {
      this.colors.set(colors, offset * this.colorCount);
    }
  }, {
    key: "sendPixels",
    value: function sendPixels() {
      this.countFPS();
      this.opcHost.sendPixels(this.channelNumber, this.colors);
      this.frameCount += 1;
    }
  }, {
    key: "countFPS",
    value: function countFPS() {
      var nowSecond = new Date().getTime() / 1000 | 0;
      if (this.second != nowSecond) {
        if (this.frameCount > 0) {
          //console.log("FPS: " + this.frameCount);
        }
        this.frameCount = 0;
        this.second = nowSecond;
      }
    }
  }]);

  return OpcChannel;
}();

exports.default = OpcChannel;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(setImmediate) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _NumberDisplay = __webpack_require__(1);

var _NumberDisplay2 = _interopRequireDefault(_NumberDisplay);

var _Numeric = __webpack_require__(10);

var _Numeric2 = _interopRequireDefault(_Numeric);

var _TechnicolorSnow = __webpack_require__(11);

var _TechnicolorSnow2 = _interopRequireDefault(_TechnicolorSnow);

var _Fireflow = __webpack_require__(7);

var _Fireflow2 = _interopRequireDefault(_Fireflow);

var _MergePatterns = __webpack_require__(9);

var _MergePatterns2 = _interopRequireDefault(_MergePatterns);

var _MaskPattern = __webpack_require__(8);

var _MaskPattern2 = _interopRequireDefault(_MaskPattern);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Scoreboard = function () {
  function Scoreboard(leftDisplay, rightDisplay) {
    _classCallCheck(this, Scoreboard);

    this.leftScore = 0;
    this.rightScore = 0;

    this.fps = 32; // frames per second
    this.leftNextFrameTime = 0;
    this.rightNextFrameTime = new Date().getTime() + this.frameDuration() / 2; // interlace left and right updates

    this.running = false;

    this.leftDisplay = leftDisplay;
    this.rightDisplay = rightDisplay;

    this.pattern = new _MaskPattern2.default(new _Fireflow2.default(this), new _MergePatterns2.default([new _Numeric2.default(this.leftDisplay), new _Numeric2.default(this.rightDisplay)]));

    this.main = this.main.bind(this);
  }

  _createClass(Scoreboard, [{
    key: 'setLeft',
    value: function setLeft(score) {
      this.leftScore = score;
      this.leftDisplay.update(this.leftScore);
    }
  }, {
    key: 'setRight',
    value: function setRight(score) {
      this.rightScore = score;
      this.rightDisplay.update(this.rightScore);
    }
  }, {
    key: 'start',
    value: function start() {
      console.log("STARTING SCOREBOARD UPDATES");
      this.running = true;
      setImmediate(this.main);
    }
  }, {
    key: 'stop',
    value: function stop() {
      this.running = false;
    }
  }, {
    key: 'frameDuration',
    value: function frameDuration() {
      // in milliseconds
      return 1000 / this.fps;
    }
  }, {
    key: 'renderPattern',
    value: function renderPattern() {
      var pixels = this.pattern.render(new Date().getTime() / 1000);
      pixels.write({
        "0": this.leftDisplay.channel,
        "1": this.rightDisplay.channel
      });
    }
  }, {
    key: 'main',
    value: function main() {
      if (!this.running) {
        console.log("stopped");
        return;
      }
      var now = new Date().getTime();

      this.renderPattern();

      if (this.leftNextFrameTime <= now) {
        this.updateLeft();
        this.leftDisplay.channel.sendPixels();
      } else {
        if (this.rightNextFrameTime <= now) {
          this.updateRight();
          this.rightDisplay.channel.sendPixels();
        }
      }

      var msTilNextUpdate = Math.min(this.leftNextFrameTime, this.rightNextFrameTime) - now;

      setTimeout(this.main, msTilNextUpdate);
    }
  }, {
    key: 'updateLeft',
    value: function updateLeft() {
      var now = new Date().getTime();
      this.leftNextFrameTime = now + this.frameDuration();
    }
  }, {
    key: 'updateRight',
    value: function updateRight() {
      var now = new Date().getTime();
      this.rightNextFrameTime = now + this.frameDuration();
    }
  }]);

  return Scoreboard;
}();

exports.default = Scoreboard;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(14).setImmediate))

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// Represents a segment in a NumberDisplay

var Segment = function () {
  function Segment(channel, offset, is_vertical) {
    _classCallCheck(this, Segment);

    this.channel = channel;
    this.offset = offset;
    this.is_vertical = is_vertical;

    this.colorCount = 3;
    this.pixelCount = 7 + 9 + 7;
  }

  _createClass(Segment, [{
    key: "width",
    value: function width() {
      if (this.is_vertical) {
        return 3;
      } else {
        return 9;
      }
    }
  }, {
    key: "height",
    value: function height() {
      if (this.is_vertical) {
        return 9;
      } else {
        return 3;
      }
    }
  }, {
    key: "livePixel",
    value: function livePixel(x, y) {
      var bottom = this.height() - 1;
      var right = this.width() - 1;

      if (x == 0 && y == 0) {
        return false;
      }
      if (x == right && y == 0) {
        return false;
      }
      if (x == 0 && y == bottom) {
        return false;
      }
      if (x == right && y == bottom) {
        return false;
      }

      return true;
    }
  }, {
    key: "channelNumber",
    value: function channelNumber() {
      return this.channel.channelNumber;
    }
  }, {
    key: "pixelIdForXY",
    value: function pixelIdForXY(x, y) {
      if (this.is_vertical) {
        if (x == 0) {
          return this.offset + y - 1;
        } else if (x == 1) {
          return this.offset + 15 - y;
        } else if (x == 2) {
          return this.offset + y + 15;
        }
      } else {
        if (y == 0) {
          return this.offset + x - 1;
        } else if (y == 1) {
          return this.offset + 15 - x;
        } else if (y == 2) {
          return this.offset + x + 15;
        }
      }
    }
  }, {
    key: "paint",
    value: function paint(pixels, f) {
      for (var x = 0; x < this.width(); x++) {
        for (var y = 0; y < this.height(); y++) {
          if (this.livePixel(x, y)) {
            pixels.set(this.channelNumber(), this.pixelIdForXY(x, y), f(x, y));
          }
        }
      }
    }
  }]);

  return Segment;
}();

exports.default = Segment;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Pixels = __webpack_require__(0);

var _Pixels2 = _interopRequireDefault(_Pixels);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Fireflow = function () {
  function Fireflow(scoreboard) {
    _classCallCheck(this, Fireflow);

    this.scoreboard = scoreboard;
  }

  _createClass(Fireflow, [{
    key: 'render',
    value: function render(time) {
      var pixels = new _Pixels2.default();
      var numberDisplays = [this.scoreboard.leftDisplay, this.scoreboard.rightDisplay];
      for (var d = 0; d < numberDisplays.length; d++) {
        var numberDisplay = numberDisplays[d];
        var number = numberDisplay.number;
        numberDisplay.paint(pixels, function (x, y) {
          var red = 0.75 + Math.max(0, Math.sin(y + time * number / 10)); //numberDisplay.number
          return [red, red - 1., 0, 1];
        });
      }
      return pixels;
    }
  }]);

  return Fireflow;
}();

exports.default = Fireflow;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Pixels = __webpack_require__(0);

var _Pixels2 = _interopRequireDefault(_Pixels);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MaskPattern = function () {
  function MaskPattern(pattern, mask) {
    _classCallCheck(this, MaskPattern);

    this.pattern = pattern;
    this.mask = mask;
  }

  _createClass(MaskPattern, [{
    key: 'render',
    value: function render(time) {
      var colorPixels = this.pattern.render(time);
      var maskPixels = this.mask.render(time);
      return maskPixels.mask(colorPixels);
    }
  }]);

  return MaskPattern;
}();

exports.default = MaskPattern;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Pixels = __webpack_require__(0);

var _Pixels2 = _interopRequireDefault(_Pixels);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MergePatterns = function () {
  function MergePatterns(patterns) {
    _classCallCheck(this, MergePatterns);

    this.patterns = patterns;
  }

  _createClass(MergePatterns, [{
    key: 'render',
    value: function render(time) {
      var pixels = new _Pixels2.default();
      for (var i = 0; i < this.patterns.length; i++) {
        var newPixels = this.patterns[i].render(time);
        pixels = newPixels.combine(pixels);
      }
      return pixels;
    }
  }]);

  return MergePatterns;
}();

exports.default = MergePatterns;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Pixels = __webpack_require__(0);

var _Pixels2 = _interopRequireDefault(_Pixels);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SevenSegment = {
  "0": 63,
  "1": 6,
  "2": 91,
  "3": 79,
  "4": 102,
  "5": 109,
  "6": 125,
  "7": 7,
  "8": 127,
  "9": 111
};

var Numeric = function () {
  function Numeric(numberDisplay) {
    _classCallCheck(this, Numeric);

    this.numberDisplay = numberDisplay;
  }

  _createClass(Numeric, [{
    key: "render",
    value: function render(time) {
      var pixels = new _Pixels2.default();
      var number = this.numberDisplay.number;
      var color = [0, 0, 0, 0];
      if (number >= 100) {
        color = [1, 1, 1, 1];
      }
      this.numberDisplay.segments[0].paint(pixels, function (x, y) {
        return color;
      });
      this.numberDisplay.segments[1].paint(pixels, function (x, y) {
        return color;
      });

      var digit1 = Math.floor(number / 10) % 10;
      var bits = SevenSegment[digit1];
      for (var i = 0; i < 7; i++) {
        var color = [0, 0, 0, 0];
        if (bits >> i & 1) {
          color = [1, 1, 1, 1];
        }
        this.numberDisplay.segments[i + 2].paint(pixels, function (x, y) {
          return color;
        });
      }
      var digit2 = number % 10;
      var bits = SevenSegment[digit2];
      for (var i = 0; i < 7; i++) {
        var color = [0, 0, 0, 0];
        if (bits >> i & 1) {
          color = [1, 1, 1, 1];
        }
        this.numberDisplay.segments[i + 9].paint(pixels, function (x, y) {
          return color;
        });
      }
      return pixels;
    }
  }]);

  return Numeric;
}();

exports.default = Numeric;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Pixels = __webpack_require__(0);

var _Pixels2 = _interopRequireDefault(_Pixels);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TechnicolorSnow = function () {
  function TechnicolorSnow(scoreboard) {
    _classCallCheck(this, TechnicolorSnow);

    this.scoreboard = scoreboard;
  }

  _createClass(TechnicolorSnow, [{
    key: 'render',
    value: function render(time) {
      var pixels = new _Pixels2.default();
      var numberDisplays = [this.scoreboard.leftDisplay, this.scoreboard.rightDisplay];
      for (var d = 0; d < numberDisplays.length; d++) {
        var numberDisplay = numberDisplays[d];
        for (var i = 0; i < 16; i++) {
          numberDisplay.segments[i].paint(pixels, function (x, y) {
            return [Math.random(), Math.random(), Math.random(), 1];
          });
        }
      }
      return pixels;
    }
  }]);

  return TechnicolorSnow;
}();

exports.default = TechnicolorSnow;

/***/ }),
/* 12 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global, process) {(function (global, undefined) {
    "use strict";

    if (global.setImmediate) {
        return;
    }

    var nextHandle = 1; // Spec says greater than zero
    var tasksByHandle = {};
    var currentlyRunningATask = false;
    var doc = global.document;
    var registerImmediate;

    function setImmediate(callback) {
      // Callback can either be a function or a string
      if (typeof callback !== "function") {
        callback = new Function("" + callback);
      }
      // Copy function arguments
      var args = new Array(arguments.length - 1);
      for (var i = 0; i < args.length; i++) {
          args[i] = arguments[i + 1];
      }
      // Store and register the task
      var task = { callback: callback, args: args };
      tasksByHandle[nextHandle] = task;
      registerImmediate(nextHandle);
      return nextHandle++;
    }

    function clearImmediate(handle) {
        delete tasksByHandle[handle];
    }

    function run(task) {
        var callback = task.callback;
        var args = task.args;
        switch (args.length) {
        case 0:
            callback();
            break;
        case 1:
            callback(args[0]);
            break;
        case 2:
            callback(args[0], args[1]);
            break;
        case 3:
            callback(args[0], args[1], args[2]);
            break;
        default:
            callback.apply(undefined, args);
            break;
        }
    }

    function runIfPresent(handle) {
        // From the spec: "Wait until any invocations of this algorithm started before this one have completed."
        // So if we're currently running a task, we'll need to delay this invocation.
        if (currentlyRunningATask) {
            // Delay by doing a setTimeout. setImmediate was tried instead, but in Firefox 7 it generated a
            // "too much recursion" error.
            setTimeout(runIfPresent, 0, handle);
        } else {
            var task = tasksByHandle[handle];
            if (task) {
                currentlyRunningATask = true;
                try {
                    run(task);
                } finally {
                    clearImmediate(handle);
                    currentlyRunningATask = false;
                }
            }
        }
    }

    function installNextTickImplementation() {
        registerImmediate = function(handle) {
            process.nextTick(function () { runIfPresent(handle); });
        };
    }

    function canUsePostMessage() {
        // The test against `importScripts` prevents this implementation from being installed inside a web worker,
        // where `global.postMessage` means something completely different and can't be used for this purpose.
        if (global.postMessage && !global.importScripts) {
            var postMessageIsAsynchronous = true;
            var oldOnMessage = global.onmessage;
            global.onmessage = function() {
                postMessageIsAsynchronous = false;
            };
            global.postMessage("", "*");
            global.onmessage = oldOnMessage;
            return postMessageIsAsynchronous;
        }
    }

    function installPostMessageImplementation() {
        // Installs an event handler on `global` for the `message` event: see
        // * https://developer.mozilla.org/en/DOM/window.postMessage
        // * http://www.whatwg.org/specs/web-apps/current-work/multipage/comms.html#crossDocumentMessages

        var messagePrefix = "setImmediate$" + Math.random() + "$";
        var onGlobalMessage = function(event) {
            if (event.source === global &&
                typeof event.data === "string" &&
                event.data.indexOf(messagePrefix) === 0) {
                runIfPresent(+event.data.slice(messagePrefix.length));
            }
        };

        if (global.addEventListener) {
            global.addEventListener("message", onGlobalMessage, false);
        } else {
            global.attachEvent("onmessage", onGlobalMessage);
        }

        registerImmediate = function(handle) {
            global.postMessage(messagePrefix + handle, "*");
        };
    }

    function installMessageChannelImplementation() {
        var channel = new MessageChannel();
        channel.port1.onmessage = function(event) {
            var handle = event.data;
            runIfPresent(handle);
        };

        registerImmediate = function(handle) {
            channel.port2.postMessage(handle);
        };
    }

    function installReadyStateChangeImplementation() {
        var html = doc.documentElement;
        registerImmediate = function(handle) {
            // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
            // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
            var script = doc.createElement("script");
            script.onreadystatechange = function () {
                runIfPresent(handle);
                script.onreadystatechange = null;
                html.removeChild(script);
                script = null;
            };
            html.appendChild(script);
        };
    }

    function installSetTimeoutImplementation() {
        registerImmediate = function(handle) {
            setTimeout(runIfPresent, 0, handle);
        };
    }

    // If supported, we should attach to the prototype of global, since that is where setTimeout et al. live.
    var attachTo = Object.getPrototypeOf && Object.getPrototypeOf(global);
    attachTo = attachTo && attachTo.setTimeout ? attachTo : global;

    // Don't get fooled by e.g. browserify environments.
    if ({}.toString.call(global.process) === "[object process]") {
        // For Node.js before 0.9
        installNextTickImplementation();

    } else if (canUsePostMessage()) {
        // For non-IE10 modern browsers
        installPostMessageImplementation();

    } else if (global.MessageChannel) {
        // For web workers, where supported
        installMessageChannelImplementation();

    } else if (doc && "onreadystatechange" in doc.createElement("script")) {
        // For IE 6–8
        installReadyStateChangeImplementation();

    } else {
        // For older browsers
        installSetTimeoutImplementation();
    }

    attachTo.setImmediate = setImmediate;
    attachTo.clearImmediate = clearImmediate;
}(typeof self === "undefined" ? typeof global === "undefined" ? this : global : self));

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(15), __webpack_require__(12)))

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

var apply = Function.prototype.apply;

// DOM APIs, for completeness

exports.setTimeout = function() {
  return new Timeout(apply.call(setTimeout, window, arguments), clearTimeout);
};
exports.setInterval = function() {
  return new Timeout(apply.call(setInterval, window, arguments), clearInterval);
};
exports.clearTimeout =
exports.clearInterval = function(timeout) {
  if (timeout) {
    timeout.close();
  }
};

function Timeout(id, clearFn) {
  this._id = id;
  this._clearFn = clearFn;
}
Timeout.prototype.unref = Timeout.prototype.ref = function() {};
Timeout.prototype.close = function() {
  this._clearFn.call(window, this._id);
};

// Does not start the time, just sets up the members needed.
exports.enroll = function(item, msecs) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = msecs;
};

exports.unenroll = function(item) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = -1;
};

exports._unrefActive = exports.active = function(item) {
  clearTimeout(item._idleTimeoutId);

  var msecs = item._idleTimeout;
  if (msecs >= 0) {
    item._idleTimeoutId = setTimeout(function onTimeout() {
      if (item._onTimeout)
        item._onTimeout();
    }, msecs);
  }
};

// setimmediate attaches itself to the global object
__webpack_require__(13);
exports.setImmediate = setImmediate;
exports.clearImmediate = clearImmediate;


/***/ }),
/* 15 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ })
/******/ ]);