class TinyDigit {
  constructor(channel, offset) {
    this.channel = channel;
    this.offset = offset;

    this.colorCount = 3;
    this.pixelCount = 13;

    this.width = 3;
    this.height = 5;
  }

  livePixel(x,y) {
    let bottom = this.height - 1;
    let right = this.width - 1;

    if(x < 0 || y < 0) { return false; }
    if(x > right || y > bottom) { return false; }

    // two blanks inside the 8s
    if( (x==1) && (y == 1 || y == 3) ) { return false; }

    return true;
  }

  pixelIdForXY(x, y) {
    var ids = [
      [11, 10, 9],
      [12, -1, 8],
      [ 2,  1, 0],
      [ 3, -1, 7],
      [ 4,  5, 6]
    ];
    var r = ids[y][x];
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

export default TinyDigit;
