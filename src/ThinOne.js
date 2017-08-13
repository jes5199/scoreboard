class ThinOne {
  constructor(channel, offset) {
    this.channel = channel;
    this.offset = offset;

    this.colorCount = 3;
    this.pixelCount = 20;

    this.width = 1;
    this.height = 7;
  }

  livePixel(x,y) {
    let bottom = this.height - 1;
    let right = this.width - 1;

    if(x < 0 || y < 0) { return false; }
    if(x > right || y > bottom) { return false; }

    return true;
  }

  pixelIdForXY(x, y) {
    var ids = [
      0, 1, 2, 3, 4, 5, 6
    ];
    var r = ids[y];
    return r + this.offset;
  }

  paint(pixels, f) {
    for(var x = 0; x < this.width; x++) {
      for(var y = 0; y < this.height; y++) {
        if(this.livePixel(x,y)) {
          pixels.set(this.channel.channelNumber, this.pixelIdForXY(x,y), f(x,y));
        }
      }
    }
    return pixels;
  }
}

export default ThinOne;
