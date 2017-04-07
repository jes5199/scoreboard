// Represents a segment in a NumberDisplay

class Segment {
  constructor(channel, offset, is_vertical) {
    this.channel = channel;
    this.offset = offset;
    this.is_vertical = is_vertical;

    this.colorCount = 3;
    this.pixelCount = 7 + 9 + 7;
  }

  width() {
    if(this.is_vertical) {
      return 3;
    } else {
      return 9;
    }
  }

  height() {
    if(this.is_vertical) {
      return 9;
    } else {
      return 3;
    }
  }

  livePixel(x,y) {
    let bottom = this.height() - 1;
    let right = this.width() - 1;

    if(x==0 && y == 0) { return false; }
    if(x==right && y == 0) { return false; }
    if(x==0 && y == bottom) { return false; }
    if(x==right && y == bottom) { return false; }

    return true;
  }

  channelNumber() {
    return this.channel.channelNumber;
  }

  pixelIdForXY(x,y) {
    if(this.is_vertical) {
      if(x == 0) {
        return this.offset + y - 1;
      } else if(x == 1) {
        return this.offset + 15 - y;
      } else if(x == 2) {
        return this.offset + y + 15;
      }
    } else {
      if(y == 0) {
        return this.offset + x - 1;
      } else if(y == 1) {
        return this.offset + 15 - x;
      } else if(y == 2) {
        return this.offset + x + 15;
      }
    }
  }

  paint(pixels, f) {
    for(var x = 0; x < this.width(); x++) {
      for(var y = 0; y < this.height(); y++) {
        if(this.livePixel(x,y)) {
          pixels.set(this.channelNumber(), this.pixelIdForXY(x,y), f(x,y));
        }
      }
    }
  }
}

export default Segment;
