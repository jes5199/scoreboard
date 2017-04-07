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

const SegmentOffset = [
  [0, 3],
  [0, 13],

  [11, 0],
  [20, 3],
  [20, 13],
  [11, 21],
  [8, 13],
  [8, 3],
  [11, 11],

  [22, 0],
  [31, 3],
  [31, 13],
  [22, 21],
  [19, 13],
  [19, 3],
  [22, 11],
];

class NumberDisplay {
  // current assumption is that each NumberDisplay is on a single, unique OPC segment
  // and all NumberDisplays are on the same OPC device
  constructor(channel, segments) {
    // TODO: assert that we have the right number of segments
    this.channel = channel;
    this.segments = segments;
    this.segmentCount = 2 + 7 + 7;
    this.segmentPixelCount = 7 + 9 + 7;
    this.colorCount = 3;
    this.number = 0;
  }

  update(number) {
    this.number = number;
  }

  paint(pixels, f) {
    for(var i = 0; i < this.segmentCount; i++) {
      this.segments[i].paint(pixels, function(x,y) {
        var offset = SegmentOffset[i];
        return f(x+offset[0], y+offset[1]);
      })
    }
  }
}

export default NumberDisplay;
