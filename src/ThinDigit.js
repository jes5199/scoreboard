class ThinDigit {
  constructor(channel, offset) {
    this.channel = channel;
    this.offset = offset;

    this.colorCount = 3;
    this.pixelCount = 20;

    this.width = 4;
    this.height = 7;
  }

  livePixel(x,y) {
    let bottom = this.height - 1;
    let right = this.width - 1;

    if(x < 0 || y < 0) { return false; }
    if(x > right || y > bottom) { return false; }

    // two blank 2x2 squares inside the 8s
    if( (x==1 || x==2) && (y == 1 || y == 2) ) { return false; }
    if( (x==4 || x==5) && (y == 1 || y == 2) ) { return false; }

    return true;
  }

  pixelIdForXY(x, y) {
    var ids = [
      [17, 16, 15, 14],
      [18, -1, -1, 13],
      [19, -1, -1, 12],
      [ 3,  2,  1,  0],
      [ 4, -1, -1, 11],
      [ 5, -1, -1, 10],
      [ 6,  7,  8,  9]
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

export default ThinDigit;
