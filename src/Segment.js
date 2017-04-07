// Represents a segment in a NumberDisplay

class Segment {
  constructor(channel, offset) {
    this.channel = channel;
    this.offset = offset;
    this.colorCount = 3;
    this.pixelCount = 7 + 9 + 7;
    this.colors = new Uint8ClampedArray(this.pixelCount * this.colorCount);
  }
}

export default Segment;
