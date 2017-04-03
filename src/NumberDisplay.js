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

    this.segments.forEach(function(segment){
      segment.solidColor(Math.random() * 255, Math.random() * 255, Math.random() * 255);
    })

    this.channel.sendPixels();
  }
}

export default NumberDisplay;
