// Represents a segment in a NumberDisplay

class Segment {
  constructor(channel, offset) {
    this.channel = channel;
    this.offset = offset;
    this.colorCount = 3;
    this.pixelCount = 7 + 9 + 7;
    this.colors = new Uint8ClampedArray(this.pixelCount * this.colorCount);
  }

  setChannelPixels() {
    this.channel.setPixels(this.offset, this.colors);
  }

  solidColor(r,g,b) {
    for(var i = 0; i < this.pixelCount; i++) {
      this.colors[i * this.colorCount + 0] = r;
      this.colors[i * this.colorCount + 1] = g;
      this.colors[i * this.colorCount + 2] = b;
    }
    this.setChannelPixels();
  }
}

export default Segment;
