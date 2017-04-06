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

      this.segments.forEach(function (segment) {
        segment.solidColor(Math.random() * 255, Math.random() * 255, Math.random() * 255);
      });

      this.channel.sendPixels();
    }
  }]);

  return NumberDisplay;
}();

exports.default = NumberDisplay;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Scoreboard = __webpack_require__(6);

var _Scoreboard2 = _interopRequireDefault(_Scoreboard);

var _OpcHost = __webpack_require__(5);

var _OpcHost2 = _interopRequireDefault(_OpcHost);

var _OpcChannel = __webpack_require__(4);

var _OpcChannel2 = _interopRequireDefault(_OpcChannel);

var _Segment = __webpack_require__(7);

var _Segment2 = _interopRequireDefault(_Segment);

var _NumberDisplay = __webpack_require__(0);

var _NumberDisplay2 = _interopRequireDefault(_NumberDisplay);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var WiringDiagram = function WiringDiagram() {
  _classCallCheck(this, WiringDiagram);

  this.opcHost = new _OpcHost2.default("localhost", 7890);
  this.leftOpcChannel = new _OpcChannel2.default(this.opcHost, 0, 368);
  this.rightOpcChannel = new _OpcChannel2.default(this.opcHost, 1, 368);

  var ledsInSegment = 7 + 9 + 7;

  this.leftDisplay = new _NumberDisplay2.default(this.leftOpcChannel, [
  // 100s
  new _Segment2.default(this.leftOpcChannel, 0 * ledsInSegment), new _Segment2.default(this.leftOpcChannel, 1 * ledsInSegment),

  // 10s
  new _Segment2.default(this.leftOpcChannel, 2 * ledsInSegment), new _Segment2.default(this.leftOpcChannel, 3 * ledsInSegment), new _Segment2.default(this.leftOpcChannel, 4 * ledsInSegment), new _Segment2.default(this.leftOpcChannel, 5 * ledsInSegment), new _Segment2.default(this.leftOpcChannel, 6 * ledsInSegment), new _Segment2.default(this.leftOpcChannel, 7 * ledsInSegment), new _Segment2.default(this.leftOpcChannel, 8 * ledsInSegment),

  // 1s
  new _Segment2.default(this.leftOpcChannel, 9 * ledsInSegment), new _Segment2.default(this.leftOpcChannel, 10 * ledsInSegment), new _Segment2.default(this.leftOpcChannel, 11 * ledsInSegment), new _Segment2.default(this.leftOpcChannel, 12 * ledsInSegment), new _Segment2.default(this.leftOpcChannel, 13 * ledsInSegment), new _Segment2.default(this.leftOpcChannel, 14 * ledsInSegment), new _Segment2.default(this.leftOpcChannel, 15 * ledsInSegment)]);

  this.rightDisplay = new _NumberDisplay2.default(this.rightOpcChannel, [
  // 100s
  new _Segment2.default(this.rightOpcChannel, 0 * ledsInSegment), new _Segment2.default(this.rightOpcChannel, 1 * ledsInSegment),

  // 10s
  new _Segment2.default(this.rightOpcChannel, 2 * ledsInSegment), new _Segment2.default(this.rightOpcChannel, 3 * ledsInSegment), new _Segment2.default(this.rightOpcChannel, 4 * ledsInSegment), new _Segment2.default(this.rightOpcChannel, 5 * ledsInSegment), new _Segment2.default(this.rightOpcChannel, 6 * ledsInSegment), new _Segment2.default(this.rightOpcChannel, 7 * ledsInSegment), new _Segment2.default(this.rightOpcChannel, 8 * ledsInSegment),

  // 1s
  new _Segment2.default(this.rightOpcChannel, 9 * ledsInSegment), new _Segment2.default(this.rightOpcChannel, 10 * ledsInSegment), new _Segment2.default(this.rightOpcChannel, 11 * ledsInSegment), new _Segment2.default(this.rightOpcChannel, 12 * ledsInSegment), new _Segment2.default(this.rightOpcChannel, 13 * ledsInSegment), new _Segment2.default(this.rightOpcChannel, 14 * ledsInSegment), new _Segment2.default(this.rightOpcChannel, 15 * ledsInSegment)]);

  this.scoreboard = new _Scoreboard2.default(this.leftDisplay, this.rightDisplay);
};

exports.default = WiringDiagram;

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("readline");

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _WiringDiagram = __webpack_require__(1);

var _WiringDiagram2 = _interopRequireDefault(_WiringDiagram);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var readline = __webpack_require__(2);

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

var scoreboard = new _WiringDiagram2.default().scoreboard;
scoreboard.start();

var ask = function ask() {
  rl.question('L BPM? ', function (answer) {
    if (answer === '') {
      rl.close();
    } else {
      scoreboard.setLeft(answer);
      rl.question('R BPM ? ', function (answer) {
        if (answer === '') {
          rl.close();
        } else {
          scoreboard.setRight(answer);
          setTimeout(ask, 1000);
        }
      });
    }
  });
};

ask();

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


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var net = __webpack_require__(8);

var OpcHost = function () {
  function OpcHost(host, port) {
    _classCallCheck(this, OpcHost);

    this.host = host;
    this.port = port;
    this.client = new net.Socket();

    this.connected = false;
    this.connecting = false;

    this.onConnected = this.onConnected.bind(this);
    this.onClose = this.onClose.bind(this);

    this.connect();
  }

  _createClass(OpcHost, [{
    key: "sendPixels",
    value: function sendPixels(channel, colors) {
      if (!this.connected) {
        this.connect();
        return;
      }
      var command = 0; // set Pixels
      var size_high = colors.length / 256;
      var size_low = colors.length % 256;
      var header = new Buffer([channel, command, size_high, size_low]);
      // Apparently node doesn't have an explicit "flush"
      // so let's try to do one big write per message
      this.client.write(Buffer.concat([header, new Buffer(colors)]));
    }
  }, {
    key: "connect",
    value: function connect() {
      if (this.connected || this.connecting) {
        return;
      }
      this.connecting = true;
      console.log("Connecting to " + this.host + ":" + this.port);
      this.client.connect(this.port, this.host, this.onConnected);
    }
  }, {
    key: "onConnected",
    value: function onConnected() {
      this.connected = true;
      this.connecting = false;
    }
  }, {
    key: "onClose",
    value: function onClose() {
      this.connected = false;
      this.connecting = false;
    }
  }]);

  return OpcHost;
}();

exports.default = OpcHost;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _NumberDisplay = __webpack_require__(0);

var _NumberDisplay2 = _interopRequireDefault(_NumberDisplay);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Scoreboard = function () {
  function Scoreboard(leftDisplay, rightDisplay) {
    _classCallCheck(this, Scoreboard);

    this.leftScore = 0;
    this.rightScore = 0;

    this.fps = 32; // frames per second
    this.leftNextFrameTime = 0;
    this.rightNextFrameTime = 0;

    this.running = false;

    this.leftDisplay = leftDisplay;
    this.rightDisplay = rightDisplay;

    this.main = this.main.bind(this);
  }

  _createClass(Scoreboard, [{
    key: "setLeft",
    value: function setLeft(score) {
      this.leftScore = score;
    }
  }, {
    key: "setRight",
    value: function setRight(score) {
      this.leftScore = score;
    }
  }, {
    key: "start",
    value: function start() {
      console.log("STARTING SCOREBOARD UPDATES");
      this.running = true;
      setImmediate(this.main);
    }
  }, {
    key: "stop",
    value: function stop() {
      this.running = false;
    }
  }, {
    key: "frameDuration",
    value: function frameDuration() {
      // in milliseconds
      return 1000 / this.fps;
    }
  }, {
    key: "main",
    value: function main() {
      if (!this.running) {
        console.log("stopped");
        return;
      }
      var now = new Date().getTime();

      if (this.leftNextFrameTime <= now) {
        this.updateLeft();
      } else {
        if (this.rightNextFrameTime <= now) {
          this.updateRight();
        }
      }

      var msTilNextUpdate = Math.min(this.leftNextFrameTime, this.rightNextFrameTime) - now;

      setTimeout(this.main, msTilNextUpdate);
    }
  }, {
    key: "updateLeft",
    value: function updateLeft() {
      var now = new Date().getTime();
      this.leftNextFrameTime = now + this.frameDuration();
      this.leftDisplay.update(this.leftScore);
    }
  }, {
    key: "updateRight",
    value: function updateRight() {
      var now = new Date().getTime();
      this.rightNextFrameTime = now + this.frameDuration();
      this.rightDisplay.update(this.rightScore);
    }
  }]);

  return Scoreboard;
}();

exports.default = Scoreboard;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// Represents a segment in a NumberDisplay

var Segment = function () {
  function Segment(channel, offset) {
    _classCallCheck(this, Segment);

    this.channel = channel;
    this.offset = offset;
    this.colorCount = 3;
    this.pixelCount = 7 + 9 + 7;
    this.colors = new Uint8ClampedArray(this.pixelCount * this.colorCount);
  }

  _createClass(Segment, [{
    key: "setChannelPixels",
    value: function setChannelPixels() {
      this.channel.setPixels(this.offset, this.colors);
    }
  }, {
    key: "solidColor",
    value: function solidColor(r, g, b) {
      for (var i = 0; i < this.pixelCount; i++) {
        this.colors[i * this.colorCount + 0] = r;
        this.colors[i * this.colorCount + 1] = g;
        this.colors[i * this.colorCount + 2] = b;
      }
      this.setChannelPixels();
    }
  }]);

  return Segment;
}();

exports.default = Segment;

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = require("net");

/***/ })
/******/ ]);