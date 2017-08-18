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
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
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
            var thatC = that.dataByChannel[ch][i];
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

var _Scoreboard = __webpack_require__(6);

var _Scoreboard2 = _interopRequireDefault(_Scoreboard);

var _OpcChannel = __webpack_require__(5);

var _OpcChannel2 = _interopRequireDefault(_OpcChannel);

var _ThinNumberDisplay = __webpack_require__(8);

var _ThinNumberDisplay2 = _interopRequireDefault(_ThinNumberDisplay);

var _ThinDigit = __webpack_require__(7);

var _ThinDigit2 = _interopRequireDefault(_ThinDigit);

var _ThinOne = __webpack_require__(9);

var _ThinOne2 = _interopRequireDefault(_ThinOne);

var _TinyNumberDisplay = __webpack_require__(11);

var _TinyNumberDisplay2 = _interopRequireDefault(_TinyNumberDisplay);

var _TinyDigit = __webpack_require__(10);

var _TinyDigit2 = _interopRequireDefault(_TinyDigit);

var _LogoDisplay = __webpack_require__(3);

var _LogoDisplay2 = _interopRequireDefault(_LogoDisplay);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var WiringDiagram = function WiringDiagram(opcHost) {
  _classCallCheck(this, WiringDiagram);

  // TODO: MQTT/OPC shared driver
  this.opcHost = opcHost;
  this.rightOpcChannel = new _OpcChannel2.default(this.opcHost, 1, 47);
  this.logoOpcChannel = new _OpcChannel2.default(this.opcHost, 2, 15);
  this.timerOpcChannel = new _OpcChannel2.default(this.opcHost, 3, 26);
  this.leftOpcChannel = new _OpcChannel2.default(this.opcHost, 4, 47);

  this.leftDisplay = new _ThinNumberDisplay2.default(this.leftOpcChannel, [
  // 1s
  new _ThinDigit2.default(this.leftOpcChannel, 0),

  // 10s
  new _ThinDigit2.default(this.leftOpcChannel, 20),

  // 100s
  new _ThinOne2.default(this.leftOpcChannel, 40)]);

  this.rightDisplay = new _ThinNumberDisplay2.default(this.rightOpcChannel, [
  // 1s
  new _ThinDigit2.default(this.rightOpcChannel, 0),

  // 10s
  new _ThinDigit2.default(this.rightOpcChannel, 20),

  // 100s
  new _ThinOne2.default(this.rightOpcChannel, 40)]);

  this.timerDisplay = new _TinyNumberDisplay2.default(this.timerOpcChannel, [
  // 1s
  new _TinyDigit2.default(this.timerOpcChannel, 0),

  // 10s
  new _TinyDigit2.default(this.timerOpcChannel, 13)]);

  this.logoDisplay = new _LogoDisplay2.default(this.logoOpcChannel);

  this.scoreboard = new _Scoreboard2.default(this.leftDisplay, this.rightDisplay, this.timerDisplay, this.logoDisplay);
};

exports.default = WiringDiagram;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _WiringDiagram = __webpack_require__(1);

var _WiringDiagram2 = _interopRequireDefault(_WiringDiagram);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var fakeHost = {
  connect: function connect() {},
  sendPixels: function sendPixels(channel, colors) {
    colors = Array.from(colors);
    for (var i = 0; i < document.pixels[channel - 1].length; i++) {
      document.pixels[channel - 1][i] = colors[i];
    }
  }
};

var scoreboard = new _WiringDiagram2.default(fakeHost).scoreboard;
scoreboard.start();

document.setState = function (x) {
  scoreboard.setState(x);
};

document.setLeft = function (x) {
  scoreboard.setLeft(x);
};

document.setRight = function (x) {
  scoreboard.setRight(x);
};

document.setTimer = function (x) {
  scoreboard.setTimer(x);
};

document.setLogoColor = function (x) {
  scoreboard.setLogoColor(x);
};

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var LogoDisplay = function () {
  function LogoDisplay(channel) {
    _classCallCheck(this, LogoDisplay);

    this.channel = channel;
    this.color = [255, 0, 0];
    this.width = 5;
    this.height = 3;
  }

  _createClass(LogoDisplay, [{
    key: "update",
    value: function update(color) {
      this.color = color;
    }
  }, {
    key: "pixelIdForXY",
    value: function pixelIdForXY(x, y) {
      var pixels = [[14, 9, 8, 3, 2], [13, 10, 7, 4, 1], [12, 11, 6, 5, 0]];

      return pixels[y][x];
    }
  }, {
    key: "paint",
    value: function paint(pixels, f) {
      for (var x = 0; x < this.width; x++) {
        for (var y = 0; y < this.height; y++) {
          pixels.set(this.channel.channelNumber, this.pixelIdForXY(x, y), f(x, y));
        }
      }
    }
  }]);

  return LogoDisplay;
}();

exports.default = LogoDisplay;

/***/ }),
/* 4 */
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

var SegmentOffset = [[0, 3], [0, 13], [11, 0], [20, 3], [20, 13], [11, 21], [8, 13], [8, 3], [11, 11], [27, 0], [36, 3], [36, 13], [27, 21], [24, 13], [24, 3], [27, 11]];

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
/* 5 */
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
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(setImmediate) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _NumberDisplay = __webpack_require__(4);

var _NumberDisplay2 = _interopRequireDefault(_NumberDisplay);

var _Numeric = __webpack_require__(20);

var _Numeric2 = _interopRequireDefault(_Numeric);

var _TechnicolorSnow = __webpack_require__(24);

var _TechnicolorSnow2 = _interopRequireDefault(_TechnicolorSnow);

var _Fireflow = __webpack_require__(16);

var _Fireflow2 = _interopRequireDefault(_Fireflow);

var _DifferenceShader = __webpack_require__(14);

var _DifferenceShader2 = _interopRequireDefault(_DifferenceShader);

var _WhiteSpark = __webpack_require__(28);

var _WhiteSpark2 = _interopRequireDefault(_WhiteSpark);

var _RedCells = __webpack_require__(22);

var _RedCells2 = _interopRequireDefault(_RedCells);

var _MergePatterns = __webpack_require__(19);

var _MergePatterns2 = _interopRequireDefault(_MergePatterns);

var _MaskPattern = __webpack_require__(18);

var _MaskPattern2 = _interopRequireDefault(_MaskPattern);

var _ThinNumeric = __webpack_require__(25);

var _ThinNumeric2 = _interopRequireDefault(_ThinNumeric);

var _TinyNumeric = __webpack_require__(27);

var _TinyNumeric2 = _interopRequireDefault(_TinyNumeric);

var _BlinkyTimer = __webpack_require__(12);

var _BlinkyTimer2 = _interopRequireDefault(_BlinkyTimer);

var _HueFade = __webpack_require__(17);

var _HueFade2 = _interopRequireDefault(_HueFade);

var _ThinWords = __webpack_require__(26);

var _ThinWords2 = _interopRequireDefault(_ThinWords);

var _StatePatternSwitch = __webpack_require__(23);

var _StatePatternSwitch2 = _interopRequireDefault(_StatePatternSwitch);

var _Off = __webpack_require__(21);

var _Off2 = _interopRequireDefault(_Off);

var _FadeIn = __webpack_require__(15);

var _FadeIn2 = _interopRequireDefault(_FadeIn);

var _BrightenToWhite = __webpack_require__(13);

var _BrightenToWhite2 = _interopRequireDefault(_BrightenToWhite);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Scoreboard = function () {
  function Scoreboard(leftDisplay, rightDisplay, timerDisplay, logoDisplay) {
    _classCallCheck(this, Scoreboard);

    this.leftScore = 0;
    this.rightScore = 0;
    this.state = 0; // idle

    this.fps = 32; // frames per second
    this.leftNextFrameTime = 0;
    this.rightNextFrameTime = new Date().getTime() + this.frameDuration() / 2; // interlace left and right updates

    this.running = false;

    this.leftDisplay = leftDisplay;
    this.rightDisplay = rightDisplay;
    this.timerDisplay = timerDisplay;
    this.logoDisplay = logoDisplay;

    this.allDisplays = [this.leftDisplay, this.logoDisplay, this.timerDisplay, this.rightDisplay];

    var bpmPattern = new _MaskPattern2.default(new _MergePatterns2.default([new _Fireflow2.default(this), new _DifferenceShader2.default(this)]), new _MergePatterns2.default([new _ThinNumeric2.default(this.leftDisplay), new _ThinNumeric2.default(this.rightDisplay)]));

    var timerPattern = new _MaskPattern2.default(new _BlinkyTimer2.default(this.timerDisplay), new _TinyNumeric2.default(this.timerDisplay));

    var logoPattern = new _HueFade2.default(this.logoDisplay);

    var activePattern = new _MergePatterns2.default([bpmPattern, timerPattern, logoPattern]);

    var idlePattern = new _MaskPattern2.default(new _MergePatterns2.default([new _Off2.default([this.logoDisplay, this.timerDisplay]), new _Fireflow2.default(this)]), new _MergePatterns2.default([new _ThinWords2.default(this.leftDisplay, this.rightDisplay), new _Off2.default([this.logoDisplay, this.timerDisplay])]));

    var wonPattern = new _MergePatterns2.default([new _BrightenToWhite2.default(activePattern), new _MaskPattern2.default(new _TechnicolorSnow2.default(this.allDisplays), new _FadeIn2.default(this.allDisplays))]);

    this.pattern = new _StatePatternSwitch2.default(this, [idlePattern, activePattern, wonPattern]);

    this.main = this.main.bind(this);
  }

  _createClass(Scoreboard, [{
    key: 'setState',
    value: function setState(state) {
      this.state = state;
    }
  }, {
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
    key: 'setTimer',
    value: function setTimer(seconds) {
      this.timerDisplay.update(seconds);
    }
  }, {
    key: 'setLogoColor',
    value: function setLogoColor(color) {
      this.logoDisplay.update(color);
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

      var output = {};
      for (var d = 0; d < this.allDisplays.length; d++) {
        output[this.allDisplays[d].channel.channelNumber] = this.allDisplays[d].channel;
      }
      pixels.write(output);
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
        this.timerDisplay.channel.sendPixels();
      } else {
        if (this.rightNextFrameTime <= now) {
          this.updateRight();
          this.rightDisplay.channel.sendPixels();
          this.logoDisplay.channel.sendPixels();
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
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(33).setImmediate))

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ThinDigit = function () {
  function ThinDigit(channel, offset) {
    _classCallCheck(this, ThinDigit);

    this.channel = channel;
    this.offset = offset;

    this.colorCount = 3;
    this.pixelCount = 20;

    this.width = 4;
    this.height = 7;
  }

  _createClass(ThinDigit, [{
    key: "livePixel",
    value: function livePixel(x, y) {
      var bottom = this.height - 1;
      var right = this.width - 1;

      if (x < 0 || y < 0) {
        return false;
      }
      if (x > right || y > bottom) {
        return false;
      }

      // two blank 2x2 squares inside the 8s
      if ((x == 1 || x == 2) && (y == 1 || y == 2)) {
        return false;
      }
      if ((x == 1 || x == 2) && (y == 4 || y == 5)) {
        return false;
      }

      return true;
    }
  }, {
    key: "pixelIdForXY",
    value: function pixelIdForXY(x, y) {
      var ids = [[17, 16, 15, 14], [18, -1, -1, 13], [19, -1, -1, 12], [3, 2, 1, 0], [4, -1, -1, 11], [5, -1, -1, 10], [6, 7, 8, 9]];
      var r = ids[y][x];
      return r + this.offset;
    }
  }, {
    key: "paint",
    value: function paint(pixels, f) {
      for (var x = 0; x < this.width; x++) {
        for (var y = 0; y < this.height; y++) {
          if (this.livePixel(x, y)) {
            pixels.set(this.channel.channelNumber, this.pixelIdForXY(x, y), f(x, y));
          }
        }
      }
      return pixels;
    }
  }]);

  return ThinDigit;
}();

exports.default = ThinDigit;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DigitOffset = [[7, 0], // 1s place
[2, 0], // 10s place
[0, 0]];

var ThinNumberDisplay = function () {
  function ThinNumberDisplay(channel, digits) {
    _classCallCheck(this, ThinNumberDisplay);

    this.channel = channel;
    this.digits = digits;
    this.number = 0;
  }

  _createClass(ThinNumberDisplay, [{
    key: "update",
    value: function update(number) {
      this.number = number;
    }
  }, {
    key: "paint",
    value: function paint(pixels, f) {
      for (var i = 0; i < this.digits.length; i++) {
        this.digits[i].paint(pixels, function (x, y) {
          var offset = DigitOffset[i];
          return f(x + offset[0], y + offset[1]);
        });
      }
      return pixels;
    }
  }]);

  return ThinNumberDisplay;
}();

exports.default = ThinNumberDisplay;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ThinOne = function () {
  function ThinOne(channel, offset) {
    _classCallCheck(this, ThinOne);

    this.channel = channel;
    this.offset = offset;

    this.colorCount = 3;
    this.pixelCount = 20;

    this.width = 1;
    this.height = 7;
  }

  _createClass(ThinOne, [{
    key: "livePixel",
    value: function livePixel(x, y) {
      var bottom = this.height - 1;
      var right = this.width - 1;

      if (x < 0 || y < 0) {
        return false;
      }
      if (x > right || y > bottom) {
        return false;
      }

      return true;
    }
  }, {
    key: "pixelIdForXY",
    value: function pixelIdForXY(x, y) {
      var ids = [0, 1, 2, 3, 4, 5, 6];
      var r = ids[y];
      return r + this.offset;
    }
  }, {
    key: "paint",
    value: function paint(pixels, f) {
      for (var x = 0; x < this.width; x++) {
        for (var y = 0; y < this.height; y++) {
          if (this.livePixel(x, y)) {
            pixels.set(this.channel.channelNumber, this.pixelIdForXY(x, y), f(x, y));
          }
        }
      }
      return pixels;
    }
  }]);

  return ThinOne;
}();

exports.default = ThinOne;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TinyDigit = function () {
  function TinyDigit(channel, offset) {
    _classCallCheck(this, TinyDigit);

    this.channel = channel;
    this.offset = offset;

    this.colorCount = 3;
    this.pixelCount = 13;

    this.width = 3;
    this.height = 5;
  }

  _createClass(TinyDigit, [{
    key: "livePixel",
    value: function livePixel(x, y) {
      var bottom = this.height - 1;
      var right = this.width - 1;

      if (x < 0 || y < 0) {
        return false;
      }
      if (x > right || y > bottom) {
        return false;
      }

      // two blanks inside the 8s
      if (x == 1 && (y == 1 || y == 3)) {
        return false;
      }

      return true;
    }
  }, {
    key: "pixelIdForXY",
    value: function pixelIdForXY(x, y) {
      var ids = [[11, 10, 9], [12, -1, 8], [2, 1, 0], [3, -1, 7], [4, 5, 6]];
      var r = ids[y][x];
      return r + this.offset;
    }
  }, {
    key: "paint",
    value: function paint(pixels, f) {
      for (var x = 0; x < this.width; x++) {
        for (var y = 0; y < this.height; y++) {
          if (this.livePixel(x, y)) {
            pixels.set(this.channel.channelNumber, this.pixelIdForXY(x, y), f(x, y));
          }
        }
      }
      return pixels;
    }
  }]);

  return TinyDigit;
}();

exports.default = TinyDigit;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DigitOffset = [[0, 0], // 10s place
[4, 0]];

var TinyNumberDisplay = function () {
  function TinyNumberDisplay(channel, digits) {
    _classCallCheck(this, TinyNumberDisplay);

    this.channel = channel;
    this.digits = digits;
    this.number = 60;
  }

  _createClass(TinyNumberDisplay, [{
    key: "update",
    value: function update(number) {
      this.number = number;
    }
  }, {
    key: "paint",
    value: function paint(pixels, f) {
      for (var i = 0; i < this.digits.length; i++) {
        this.digits[i].paint(pixels, function (x, y) {
          var offset = DigitOffset[i];
          return f(x + offset[0], y + offset[1]);
        });
      }
      return pixels;
    }
  }]);

  return TinyNumberDisplay;
}();

exports.default = TinyNumberDisplay;

/***/ }),
/* 12 */
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

var BlinkyTimer = function () {
  function BlinkyTimer(numberDisplay) {
    _classCallCheck(this, BlinkyTimer);

    this.numberDisplay = numberDisplay;
    this.changedAt = 0;
    this.lastValue = -1;
  }

  _createClass(BlinkyTimer, [{
    key: 'render',
    value: function render(time) {
      var pixels = new _Pixels2.default();
      var number = this.numberDisplay.number;

      if (number != this.lastValue) {
        this.lastValue = number;
        this.changedAt = time;
      }

      var d = 1 - (time - this.changedAt);
      var n = 9 * d / 10 + 0.1;

      var color = [n, n, 0, 1];

      for (var i = 0; i < 2; i++) {
        this.numberDisplay.digits[i].paint(pixels, function (x, y) {
          return color;
        });
      }
      return pixels;
    }
  }]);

  return BlinkyTimer;
}();

exports.default = BlinkyTimer;

/***/ }),
/* 13 */
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

var BrightenToWhite = function () {
  function BrightenToWhite(pattern) {
    _classCallCheck(this, BrightenToWhite);

    this.pattern = pattern;
    this.lastRenderMillis = 0;
    this.fadeStartMillis = 0;
  }

  _createClass(BrightenToWhite, [{
    key: 'render',
    value: function render(time) {
      var outPixels = new _Pixels2.default();
      var inPixels = this.pattern.render(time);

      var now = time * 1000;

      if (now - this.lastRenderMillis > 500) {
        this.fadeStartMillis = now;
      }
      this.lastRenderMillis = now;

      var brightness = 0.0 + (now - this.fadeStartMillis) / 750;

      for (var channel in inPixels.dataByChannel) {
        var channelData = inPixels.dataByChannel[channel];
        for (var i = 0; i < channelData.length; i++) {
          var pixel = channelData[i];
          var myPixel = [Math.min(pixel[0] + brightness), Math.min(pixel[1] + brightness), Math.min(pixel[2] + brightness), pixel[3] + brightness];
          outPixels.set(channel, i, myPixel);
        }
      }

      return outPixels;
    }
  }]);

  return BrightenToWhite;
}();

exports.default = BrightenToWhite;

/***/ }),
/* 14 */
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

var DifferenceShader = function () {
  function DifferenceShader(scoreboard) {
    _classCallCheck(this, DifferenceShader);

    this.scoreboard = scoreboard;
  }

  _createClass(DifferenceShader, [{
    key: 'render',
    value: function render(time) {
      var pixels = new _Pixels2.default();
      var numberDisplays = [this.scoreboard.leftDisplay, this.scoreboard.rightDisplay];
      var difference = this.scoreboard.leftDisplay.number - this.scoreboard.rightDisplay.number;

      var _loop = function _loop() {
        numberDisplay = numberDisplays[d];

        if (d) {
          difference = -difference;
        }
        var red = Math.max(0, Math.min(difference / 10, 1));
        var blue = Math.max(0, Math.min(-difference / 10, 1));
        var color = Math.max(red, blue);
        numberDisplay.paint(pixels, function (x, y) {
          return [Math.max(red, blue / 3), blue / 3, blue, color];
        });
      };

      for (var d = 0; d < numberDisplays.length; d++) {
        var numberDisplay;

        _loop();
      }
      return pixels;
    }
  }]);

  return DifferenceShader;
}();

exports.default = DifferenceShader;

/***/ }),
/* 15 */
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

var FadeIn = function () {
  function FadeIn(displays) {
    _classCallCheck(this, FadeIn);

    this.displays = displays;
    this.lastRenderMillis = 0;
    this.fadeStartMillis = 0;
  }

  _createClass(FadeIn, [{
    key: 'render',
    value: function render(time) {
      var pixels = new _Pixels2.default();

      var alpha = 0;

      var now = time * 1000;

      if (now - this.lastRenderMillis > 500) {
        this.fadeStartMillis = now;
      }
      this.lastRenderMillis = now;

      alpha = 0.15 + 0.85 * (now - this.fadeStartMillis) / 1500;
      alpha = Math.max(0, Math.min(1, alpha));

      var displays = this.displays;
      for (var d = 0; d < displays.length; d++) {
        displays[d].paint(pixels, function (x, y) {
          return [0, 0, 0, alpha];
        });
      }
      return pixels;
    }
  }]);

  return FadeIn;
}();

exports.default = FadeIn;

/***/ }),
/* 16 */
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
    this.offsets = [0, 0];
    var nowMillis = new Date().getTime();
    this.lastMillis = [nowMillis, nowMillis];
  }

  _createClass(Fireflow, [{
    key: 'moveOffset',
    value: function moveOffset(time, n, bpm) {
      var nowMillis = time * 1000;
      var diffMillis = nowMillis - this.lastMillis[n];
      this.offsets[n] += bpm / 60 * diffMillis / 1000 / 2;
      this.lastMillis[n] = nowMillis;
      this.offsets[n] %= 1.0;
    }
  }, {
    key: 'render',
    value: function render(time) {
      var pixels = new _Pixels2.default();
      var numberDisplays = [this.scoreboard.leftDisplay, this.scoreboard.rightDisplay];
      for (var d = 0; d < numberDisplays.length; d++) {
        var numberDisplay = numberDisplays[d];
        var number = numberDisplay.number;
        var angle = 0.30 * Math.PI / 2 * (d * 2 - 1);
        this.moveOffset(time, d, number);
        var offset = this.offsets[d];
        numberDisplay.paint(pixels, function (x, y) {
          //var ty = (Math.sin(angle) * x + Math.cos(angle) * y) / 4 + time * Math.PI * number / 60;
          var ty = (Math.sin(angle) * x + Math.cos(angle) * y) / 4 + offset * Math.PI * 2;
          //var red = 0.85 + Math.sin(ty + time * number / 10) + Math.sin(ty + time * number / 10 + Math.PI / 4);
          var red = 0.55 + Math.pow(Math.sin(ty), 2) + Math.sin(ty + Math.PI / 3) * 0.3;
          return [Math.max(0, red) + 0.01, Math.max(0, red - 1.) * 0.8 + 0.01, Math.max(0, 1 - red * 1.5) + 0.01, 1];
        });
      }
      return pixels;
    }
  }]);

  return Fireflow;
}();

exports.default = Fireflow;

/***/ }),
/* 17 */
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

var HueFade = function () {
  function HueFade(logoDisplay) {
    _classCallCheck(this, HueFade);

    this.logoDisplay = logoDisplay;
    this.color = [0, 0, 255];
    this.step = 1;
  }

  _createClass(HueFade, [{
    key: 'render',
    value: function render(time) {
      var pixels = new _Pixels2.default();

      var destColor = this.logoDisplay.color;

      var color = this.color;
      for (var i = 0; i < 3; i++) {
        if (color[i] > destColor[i]) {
          color[i] -= this.step;
        } else if (color[i] < destColor[i]) {
          color[i] += this.step;
        }
      }

      this.logoDisplay.paint(pixels, function (x, y) {
        return [color[0] / 255, color[1] / 255, color[2] / 255, 1]; // RGBA
      });

      return pixels;
    }
  }]);

  return HueFade;
}();

exports.default = HueFade;

/***/ }),
/* 18 */
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
/* 19 */
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
/* 20 */
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
/* 21 */
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

var Off = function () {
  function Off(displays) {
    _classCallCheck(this, Off);

    this.displays = displays;
  }

  _createClass(Off, [{
    key: 'render',
    value: function render(time) {
      var pixels = new _Pixels2.default();
      var displays = this.displays;
      for (var d = 0; d < displays.length; d++) {
        displays[d].paint(pixels, function (x, y) {
          return [0, 0, 0, 1];
        });
      }
      return pixels;
    }
  }]);

  return Off;
}();

exports.default = Off;

/***/ }),
/* 22 */
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

var RedCells = function () {
  function RedCells(scoreboard) {
    _classCallCheck(this, RedCells);

    this.scoreboard = scoreboard;
    this.d = 0;
    this.x = 0;
    this.y = 20;
    this.lastMillis = 0;
    this.leftCells = [];
    this.rightCells = [];
    for (var i = 0; i < 20; i++) {
      this.leftCells.push([Math.random() * 30, Math.random() * 18, 0.5 + 0.5 * Math.random(), 0.5 * Math.random()]);
      this.rightCells.push([Math.random() * 30, Math.random() * 18, 0.5 + 0.5 * Math.random(), 0.5 * Math.random()]);
    }
    this.lastMillis = [0, 0];
  }

  _createClass(RedCells, [{
    key: 'moveCells',
    value: function moveCells(time, d, bpm) {
      var cells = d ? this.rightCells : this.leftCells;
      var nowMillis = time * 1000;
      if (nowMillis >= this.lastMillis[d] + 1000 / bpm) {
        this.lastMillis[d] = nowMillis;

        for (var i = 0; i < cells.length; i++) {
          var cell = cells[i];
          cell[0] += Math.random() * (d ? -1 : 1);
          cell[1] -= Math.random() * 0.5;
          cell[0] += 30;
          cell[0] %= 30;
          if (cell[1] <= 0) {
            cell[1] = 18;
          }
        }
      }
    }
  }, {
    key: 'render',
    value: function render(time) {
      var pixels = new _Pixels2.default();
      var numberDisplays = [this.scoreboard.leftDisplay, this.scoreboard.rightDisplay];
      var cellpos = this;
      for (var d = 0; d < numberDisplays.length; d++) {
        this.moveCells(time, d, numberDisplays[this.d].number);
        var numberDisplay = numberDisplays[d];
        var number = numberDisplay.number;
        var angle = 0.25 * Math.PI / 2 * (d * 2 - 1);
        var cells = d ? this.rightCells : this.leftCells;
        numberDisplay.paint(pixels, function (x, y) {
          for (var i = 0; i < cells.length; i++) {
            if (x == Math.round(cells[i][0]) && y == Math.round(cells[i][1])) {
              return [cells[i][2], 0, cells[i][3], 0.8];
            }
          }
          return [0, 0, 0, 0];
        });
      }
      return pixels;
    }
  }]);

  return RedCells;
}();

exports.default = RedCells;

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var StatePatternSwitch = function () {
  function StatePatternSwitch(scoreboard, patterns) {
    _classCallCheck(this, StatePatternSwitch);

    this.scoreboard = scoreboard;
    this.patterns = patterns;
  }

  _createClass(StatePatternSwitch, [{
    key: "render",
    value: function render(time) {
      return this.patterns[this.scoreboard.state].render(time);
    }
  }]);

  return StatePatternSwitch;
}();

exports.default = StatePatternSwitch;

/***/ }),
/* 24 */
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
  function TechnicolorSnow(displays) {
    _classCallCheck(this, TechnicolorSnow);

    this.displays = displays;
  }

  _createClass(TechnicolorSnow, [{
    key: 'render',
    value: function render(time) {
      var pixels = new _Pixels2.default();
      var displays = this.displays;
      for (var d = 0; d < displays.length; d++) {
        displays[d].paint(pixels, function (x, y) {
          return [Math.random(), Math.random(), Math.random(), 1];
        });
      }
      return pixels;
    }
  }]);

  return TechnicolorSnow;
}();

exports.default = TechnicolorSnow;

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Pixels = __webpack_require__(0);

var _Pixels2 = _interopRequireDefault(_Pixels);

var _ThinNumeric = __webpack_require__(30);

var _ThinNumeric2 = _interopRequireDefault(_ThinNumeric);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ThinNumeric = function () {
  function ThinNumeric(numberDisplay) {
    _classCallCheck(this, ThinNumeric);

    this.numberDisplay = numberDisplay;
  }

  _createClass(ThinNumeric, [{
    key: 'render',
    value: function render(time) {
      var pixels = new _Pixels2.default();
      var number = this.numberDisplay.number;

      var off = [0, 0, 0, 0];
      var on = [1, 1, 1, 1];

      // 100s place
      this.numberDisplay.digits[2].paint(pixels, function (x, y) {
        if (number >= 100) {
          return on;
        } else {
          return off;
        }
      });

      // 10s place
      var tens = Math.floor(number / 10) % 10;
      var tensBmp = _ThinNumeric2.default[tens];
      this.numberDisplay.digits[1].paint(pixels, function (x, y) {
        if (tensBmp[y][x]) {
          return on;
        } else {
          return off;
        }
      });

      // 1s place
      var ones = number % 10;
      var onesBmp = _ThinNumeric2.default[ones];
      this.numberDisplay.digits[0].paint(pixels, function (x, y) {
        if (onesBmp[y][x]) {
          return on;
        } else {
          return off;
        }
      });

      return pixels;
    }
  }]);

  return ThinNumeric;
}();

exports.default = ThinNumeric;

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Pixels = __webpack_require__(0);

var _Pixels2 = _interopRequireDefault(_Pixels);

var _Thin = __webpack_require__(29);

var _Thin2 = _interopRequireDefault(_Thin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var titles = ["AS1 ", "AS1 ", "AS1 ", "AS1 ", "AS1 ", "AS1 ", "AS  ONE ", "AS   ONE", " AS ONE ", " AS  ONE", "  ASONE ", "  AS ONE"];

var words = [
// Ws and Ms are kind of illegible but sometimes it might be ok

"HARTBEAT", "HARTBEAT", "HARTBEAT", "HARTBEAT", "HARTBEAT", "HARTBEAT", "SYNC  UP", "BLOOOOOD", "SYNCBEAT", "FIREPOOF", "FIRE", "BURN", "REALFIRE", "FLAAAAME", "PLAYTHIS", "PLAYHERE", "PLAYGAME", "GAMEOVER", "GOODGAME", "GOODLUCK", "COOLHACK", "GOODIDEA", "FINDLOVE", "GOODDATE", "LOVEGAME", "LOVETEST", "LOVEPLAY", "SEXYTIME", "SEX PRTY", "GOODFUCK", "MAKEBABY", "BOOB IES", "PEEE NIS", "LIMPDICK", "EAT POOP", "FUCK YOU", "FUCKYALL", "FKYRBURN", "FKYRDAY ", "DARNIT! ", "DANGIT! ", "HOT DAMM", "OH  SHIT", "UHOHOHNO", "THATBLEW", " EATDUST", "WHATTHE?", "HUH?WHAT", "!!!!!?!?", "ONE LOVE", " ONELOVE", "TRUELOVE", "SOULMATE", "BESTBUDS", " 2X LUVS", "LOVEYOUS", "HI    HI", "HELOJACK", "MARYME? ", "FREEWIFI", "FREELOFI", "FREEHIFI", "FREEBEER", "FREEDRUG", "FREECATS", "FREEHUGS", "FREE BOB", "OPEN", "TAXIFARE", "FONECALL", "LANDLINE", "TAKEDRUG", "TAKEACID", "HUG COPS", "HUG LARY", "WASPEGGS", "NITEMARE", "HOT DICE", "LIMPDICE", "MOONROCK", "NOT  NOW", "MANALIVE", "HOLDSPCE", "JERKSONG", "GPE RULS", "JOY!LIFE", "TIMETRVL", "JES 5199"];

var ThinWords = function () {
  function ThinWords(leftNumberDisplay, rightNumberDisplay) {
    _classCallCheck(this, ThinWords);

    this.leftNumberDisplay = leftNumberDisplay;
    this.rightNumberDisplay = rightNumberDisplay;
    this.lastWordTime = 0;
    this.word = "TEST";
    this.half = 0;
    this.lastHalfWordTime = 0;
    this.title = 0;
  }

  _createClass(ThinWords, [{
    key: 'render',
    value: function render(time) {
      var now = time * 1000;
      if (now - this.lastWordTime > 8000) {
        this.title = !this.title;
        this.lastWordTime = now;
        this.lastHalfWordTime = now;
        var vocabulary = this.title ? titles : words;
        this.word = vocabulary[Math.floor(Math.random() * vocabulary.length)];
        this.half = 0;
      } else if (now - this.lastHalfWordTime > 2000) {
        this.lastHalfWordTime = now;
        this.half = !this.half;
      }
      var idx = this.word.length > 4 ? Math.floor(this.half * this.word.length / 2) : 0;
      var show = this.word.substr(idx, 4);

      var pixels = new _Pixels2.default();

      var off = [0, 0, 0, 0];
      var on = [1, 1, 1, 1];

      // 100s places are just off
      this.leftNumberDisplay.digits[2].paint(pixels, function (x, y) {
        return off;
      });
      this.rightNumberDisplay.digits[2].paint(pixels, function (x, y) {
        return off;
      });

      // L 10s place
      var leftTens = show[0];
      var leftTensBmp = _Thin2.default[leftTens];
      this.leftNumberDisplay.digits[1].paint(pixels, function (x, y) {
        if (leftTensBmp[y][x]) {
          return on;
        } else {
          return off;
        }
      });

      // L 1s place
      var leftOnes = show[1];
      var leftOnesBmp = _Thin2.default[leftOnes];
      this.leftNumberDisplay.digits[0].paint(pixels, function (x, y) {
        if (leftOnesBmp[y][x]) {
          return on;
        } else {
          return off;
        }
      });

      // R 10s place
      var rightTens = show[2];
      var rightTensBmp = _Thin2.default[rightTens];
      this.rightNumberDisplay.digits[1].paint(pixels, function (x, y) {
        if (rightTensBmp[y][x]) {
          return on;
        } else {
          return off;
        }
      });

      // R 1s place
      var rightOnes = show[3];
      var rightOnesBmp = _Thin2.default[rightOnes];
      this.rightNumberDisplay.digits[0].paint(pixels, function (x, y) {
        if (rightOnesBmp[y][x]) {
          return on;
        } else {
          return off;
        }
      });

      return pixels;
    }
  }]);

  return ThinWords;
}();

exports.default = ThinWords;

/***/ }),
/* 27 */
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

var NumberShapes = {
  "0": [[1, 1, 1], [1, 0, 1], [1, 0, 1], [1, 0, 1], [1, 1, 1]],
  "1": [[0, 0, 1], [0, 0, 1], [0, 0, 1], [0, 0, 1], [0, 0, 1]],
  "2": [[1, 1, 1], [0, 0, 1], [1, 1, 1], [1, 0, 0], [1, 1, 1]],
  "3": [[1, 1, 1], [0, 0, 1], [1, 1, 1], [0, 0, 1], [1, 1, 1]],
  "4": [[1, 0, 1], [1, 0, 1], [1, 1, 1], [0, 0, 1], [0, 0, 1]],
  "5": [[1, 1, 1], [1, 0, 0], [1, 1, 1], [0, 0, 1], [1, 1, 1]],
  "6": [[1, 1, 1], [1, 0, 0], [1, 1, 1], [1, 0, 1], [1, 1, 1]],
  "7": [[1, 1, 1], [0, 0, 1], [0, 0, 1], [0, 0, 1], [0, 0, 1]],
  "8": [[1, 1, 1], [1, 0, 1], [1, 1, 1], [1, 0, 1], [1, 1, 1]],
  "9": [[1, 1, 1], [1, 0, 1], [1, 1, 1], [0, 0, 1], [0, 1, 1]]
};

var TinyNumeric = function () {
  function TinyNumeric(numberDisplay) {
    _classCallCheck(this, TinyNumeric);

    this.numberDisplay = numberDisplay;
  }

  _createClass(TinyNumeric, [{
    key: "render",
    value: function render(time) {
      var pixels = new _Pixels2.default();
      var number = this.numberDisplay.number;

      var off = [0, 0, 0, 0];
      var on = [1, 1, 1, 1];

      // 10s place
      var tens = Math.floor(number / 10) % 10;
      var tensBmp = NumberShapes[tens];
      this.numberDisplay.digits[1].paint(pixels, function (x, y) {
        if (tensBmp[y][x]) {
          return on;
        } else {
          return off;
        }
      });

      // 1s place
      var ones = number % 10;
      var onesBmp = NumberShapes[ones];
      this.numberDisplay.digits[0].paint(pixels, function (x, y) {
        if (onesBmp[y][x]) {
          return on;
        } else {
          return off;
        }
      });

      return pixels;
    }
  }]);

  return TinyNumeric;
}();

exports.default = TinyNumeric;

/***/ }),
/* 28 */
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

var WhiteSpark = function () {
  function WhiteSpark(scoreboard) {
    _classCallCheck(this, WhiteSpark);

    this.scoreboard = scoreboard;
    this.d = 0;
    this.x = 0;
    this.y = 20;
    this.lastMillis = 0;
  }

  _createClass(WhiteSpark, [{
    key: 'moveSpark',
    value: function moveSpark(time, bpm) {
      var nowMillis = time * 1000;
      if (nowMillis >= this.lastMillis + 1000 / bpm) {
        this.lastMillis = nowMillis;
        this.x += Math.random() * (this.d ? -1 : 1);
        this.y -= Math.random() * 0.5;
        //this.d = 1;
        //this.x = 20;
        //this.y = 6;
      }
      if (this.y <= 0) {
        this.d = this.d ? 0 : 1;
        this.x = this.d ? 30 : 0;
        this.y = 18;
      }
    }
  }, {
    key: 'render',
    value: function render(time) {
      var pixels = new _Pixels2.default();
      var numberDisplays = [this.scoreboard.leftDisplay, this.scoreboard.rightDisplay];
      var whitespark = this;
      this.moveSpark(time, numberDisplays[this.d].number);
      for (var d = 0; d < numberDisplays.length; d++) {
        var numberDisplay = numberDisplays[d];
        var number = numberDisplay.number;
        var angle = 0.25 * Math.PI / 2 * (d * 2 - 1);
        numberDisplay.paint(pixels, function (x, y) {
          if (d == whitespark.d && x == Math.round(whitespark.x) && y == Math.round(whitespark.y)) {
            return [1, 1, 1, 0.5];
          } else {
            return [0, 0, 0, 0];
          };
        });
      }
      return pixels;
    }
  }]);

  return WhiteSpark;
}();

exports.default = WhiteSpark;

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var ThinFont = {
  "0": [[1, 1, 1, 1], [1, 0, 0, 1], [1, 0, 0, 1], [1, 0, 0, 1], [1, 0, 0, 1], [1, 0, 0, 1], [1, 1, 1, 1]],
  "1": [[0, 0, 1, 1], [0, 0, 0, 1], [0, 0, 0, 1], [0, 0, 0, 1], [0, 0, 0, 1], [0, 0, 0, 1], [0, 0, 0, 1]],
  "2": [[1, 1, 1, 1], [0, 0, 0, 1], [0, 0, 0, 1], [1, 1, 1, 1], [1, 0, 0, 0], [1, 0, 0, 0], [1, 1, 1, 1]],
  "3": [[1, 1, 1, 1], [0, 0, 0, 1], [0, 0, 0, 1], [0, 1, 1, 1], [0, 0, 0, 1], [0, 0, 0, 1], [1, 1, 1, 1]],
  "4": [[1, 0, 0, 1], [1, 0, 0, 1], [1, 0, 0, 1], [1, 1, 1, 1], [0, 0, 0, 1], [0, 0, 0, 1], [0, 0, 0, 1]],
  "5": [[1, 1, 1, 1], [1, 0, 0, 0], [1, 0, 0, 0], [1, 1, 1, 1], [0, 0, 0, 1], [0, 0, 0, 1], [1, 1, 1, 1]],
  "6": [[1, 1, 1, 1], [1, 0, 0, 0], [1, 0, 0, 0], [1, 1, 1, 1], [1, 0, 0, 1], [1, 0, 0, 1], [1, 1, 1, 1]],
  "7": [[1, 1, 1, 1], [0, 0, 0, 1], [0, 0, 0, 1], [0, 0, 0, 1], [0, 0, 0, 1], [0, 0, 0, 1], [0, 0, 0, 1]],
  "8": [[1, 1, 1, 1], [1, 0, 0, 1], [1, 0, 0, 1], [1, 1, 1, 1], [1, 0, 0, 1], [1, 0, 0, 1], [1, 1, 1, 1]],
  "9": [[1, 1, 1, 1], [1, 0, 0, 1], [1, 0, 0, 1], [1, 1, 1, 1], [0, 0, 0, 1], [0, 0, 0, 1], [0, 1, 1, 1]],
  "A": [[0, 1, 1, 0], [1, 0, 0, 1], [1, 0, 0, 1], [1, 1, 1, 1], [1, 0, 0, 1], [1, 0, 0, 1], [1, 0, 0, 1]],
  "B": [[1, 1, 1, 0], [1, 0, 0, 1], [1, 0, 0, 1], [1, 1, 1, 0], [1, 0, 0, 1], [1, 0, 0, 1], [1, 1, 1, 0]],
  "C": [[0, 1, 1, 1], [1, 0, 0, 0], [1, 0, 0, 0], [1, 0, 0, 0], [1, 0, 0, 0], [1, 0, 0, 0], [0, 1, 1, 1]],
  "D": [[1, 1, 1, 0], [1, 0, 0, 1], [1, 0, 0, 1], [1, 0, 0, 1], [1, 0, 0, 1], [1, 0, 0, 1], [1, 1, 1, 0]],
  "E": [[1, 1, 1, 1], [1, 0, 0, 0], [1, 0, 0, 0], [1, 1, 1, 1], [1, 0, 0, 0], [1, 0, 0, 0], [1, 1, 1, 1]],
  "F": [[1, 1, 1, 1], [1, 0, 0, 0], [1, 0, 0, 0], [1, 1, 1, 0], [1, 0, 0, 0], [1, 0, 0, 0], [1, 0, 0, 0]],
  "G": [[0, 1, 1, 0], [1, 0, 0, 1], [1, 0, 0, 0], [1, 0, 1, 1], [1, 0, 0, 1], [1, 0, 0, 1], [0, 1, 1, 0]],
  "H": [[1, 0, 0, 1], [1, 0, 0, 1], [1, 0, 0, 1], [1, 1, 1, 1], [1, 0, 0, 1], [1, 0, 0, 1], [1, 0, 0, 1]],
  "I": [[0, 0, 0, 0], [0, 0, 0, 1], [0, 0, 0, 0], [0, 0, 0, 1], [0, 0, 0, 1], [0, 0, 0, 1], [0, 0, 0, 1]],
  "J": [[0, 0, 0, 1], [0, 0, 0, 1], [0, 0, 0, 1], [0, 0, 0, 1], [0, 0, 0, 1], [1, 0, 0, 1], [0, 1, 1, 0]],
  "K": [[1, 0, 0, 1], [1, 0, 0, 1], [1, 0, 0, 1], [1, 1, 1, 0], [1, 0, 0, 1], [1, 0, 0, 1], [1, 0, 0, 1]],
  "L": [[1, 0, 0, 0], [1, 0, 0, 0], [1, 0, 0, 0], [1, 0, 0, 0], [1, 0, 0, 0], [1, 0, 0, 0], [1, 1, 1, 1]],
  "M": [// this sucks
  [0, 0, 0, 0], [0, 0, 0, 0], [1, 0, 0, 1], [0, 1, 1, 0], [0, 0, 0, 0], [1, 0, 0, 1], [1, 0, 0, 1]],
  "N": [[0, 0, 0, 0], [0, 0, 0, 0], [1, 0, 0, 0], [1, 1, 1, 0], [1, 0, 0, 1], [1, 0, 0, 1], [1, 0, 0, 1]],
  "O": [[0, 1, 1, 0], [1, 0, 0, 1], [1, 0, 0, 1], [1, 0, 0, 1], [1, 0, 0, 1], [1, 0, 0, 1], [0, 1, 1, 0]],
  "P": [[0, 1, 1, 0], [1, 0, 0, 1], [1, 0, 0, 1], [1, 1, 1, 0], [1, 0, 0, 0], [1, 0, 0, 0], [1, 0, 0, 0]],
  "Q": [[0, 1, 1, 0], [1, 0, 0, 1], [1, 0, 0, 1], [1, 0, 0, 1], [1, 0, 0, 1], [1, 0, 0, 0], [0, 1, 0, 1]],
  "R": [[1, 1, 1, 0], [1, 0, 0, 1], [1, 0, 0, 1], [1, 1, 1, 0], [1, 0, 0, 1], [1, 0, 0, 1], [1, 0, 0, 1]],
  "S": [[0, 1, 1, 1], [1, 0, 0, 0], [1, 0, 0, 0], [0, 1, 1, 0], [0, 0, 0, 1], [0, 0, 0, 1], [1, 1, 1, 0]],
  "T": [[0, 0, 0, 0], [1, 0, 0, 0], [1, 0, 0, 0], [1, 1, 1, 0], [1, 0, 0, 0], [1, 0, 0, 0], [0, 1, 1, 0]],
  "U": [[1, 0, 0, 1], [1, 0, 0, 1], [1, 0, 0, 1], [1, 0, 0, 1], [1, 0, 0, 1], [1, 0, 0, 1], [0, 1, 1, 1]],
  "V": [[1, 0, 0, 1], [1, 0, 0, 1], [1, 0, 0, 1], [1, 0, 0, 1], [1, 0, 0, 1], [1, 0, 0, 1], [0, 1, 1, 0]],
  "W": [[1, 0, 0, 1], [1, 0, 0, 1], [1, 0, 0, 1], [0, 1, 1, 0], [1, 0, 0, 1], [0, 0, 0, 0], [0, 0, 0, 0]],
  "X": [[1, 0, 0, 1], [1, 0, 0, 1], [1, 0, 0, 1], [0, 1, 1, 0], [1, 0, 0, 1], [1, 0, 0, 1], [1, 0, 0, 1]],
  "Y": [[1, 0, 0, 1], [1, 0, 0, 1], [1, 0, 0, 1], [0, 1, 1, 1], [0, 0, 0, 1], [0, 0, 0, 1], [0, 1, 1, 0]],
  "Z": [[1, 1, 1, 1], [0, 0, 0, 1], [0, 0, 0, 1], [0, 1, 1, 0], [1, 0, 0, 0], [1, 0, 0, 0], [1, 1, 1, 1]],
  " ": [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]],
  "?": [[0, 1, 1, 0], [1, 0, 0, 1], [0, 0, 0, 1], [0, 0, 1, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 1, 0]],
  "!": [[0, 0, 0, 1], [0, 0, 0, 1], [0, 0, 0, 1], [0, 0, 0, 1], [0, 0, 0, 1], [0, 0, 0, 0], [0, 0, 0, 1]]
};

exports.default = ThinFont;

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
// The only difference between these numbers and the ones in fonts/Thin.js
// is the number 1, which is serifed when used with letters

var ThinNumericFont = {
  "0": [[1, 1, 1, 1], [1, 0, 0, 1], [1, 0, 0, 1], [1, 0, 0, 1], [1, 0, 0, 1], [1, 0, 0, 1], [1, 1, 1, 1]],
  "1": [[0, 0, 0, 1], [0, 0, 0, 1], [0, 0, 0, 1], [0, 0, 0, 1], [0, 0, 0, 1], [0, 0, 0, 1], [0, 0, 0, 1]],
  "2": [[1, 1, 1, 1], [0, 0, 0, 1], [0, 0, 0, 1], [1, 1, 1, 1], [1, 0, 0, 0], [1, 0, 0, 0], [1, 1, 1, 1]],
  "3": [[1, 1, 1, 1], [0, 0, 0, 1], [0, 0, 0, 1], [0, 1, 1, 1], [0, 0, 0, 1], [0, 0, 0, 1], [1, 1, 1, 1]],
  "4": [[1, 0, 0, 1], [1, 0, 0, 1], [1, 0, 0, 1], [1, 1, 1, 1], [0, 0, 0, 1], [0, 0, 0, 1], [0, 0, 0, 1]],
  "5": [[1, 1, 1, 1], [1, 0, 0, 0], [1, 0, 0, 0], [1, 1, 1, 1], [0, 0, 0, 1], [0, 0, 0, 1], [1, 1, 1, 1]],
  "6": [[1, 1, 1, 1], [1, 0, 0, 0], [1, 0, 0, 0], [1, 1, 1, 1], [1, 0, 0, 1], [1, 0, 0, 1], [1, 1, 1, 1]],
  "7": [[1, 1, 1, 1], [0, 0, 0, 1], [0, 0, 0, 1], [0, 0, 0, 1], [0, 0, 0, 1], [0, 0, 0, 1], [0, 0, 0, 1]],
  "8": [[1, 1, 1, 1], [1, 0, 0, 1], [1, 0, 0, 1], [1, 1, 1, 1], [1, 0, 0, 1], [1, 0, 0, 1], [1, 1, 1, 1]],
  "9": [[1, 1, 1, 1], [1, 0, 0, 1], [1, 0, 0, 1], [1, 1, 1, 1], [0, 0, 0, 1], [0, 0, 0, 1], [0, 1, 1, 1]]
};

exports.default = ThinNumericFont;

/***/ }),
/* 31 */
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
/* 32 */
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

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(34), __webpack_require__(31)))

/***/ }),
/* 33 */
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
__webpack_require__(32);
exports.setImmediate = setImmediate;
exports.clearImmediate = clearImmediate;


/***/ }),
/* 34 */
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