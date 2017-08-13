let DigitOffset = [
  [7,0], // 1s place
  [2,0], // 10s place
  [0,0], // 100s place
];

class ThinNumberDisplay {
  constructor(channel, digits) {
    this.channel = channel;
    this.digits = digits;
    this.number = 0;
  }

  update(number) {
    this.number = number;
  }

  paint(pixels, f) {
    for(var i = 0; i < this.digits.length; i++) {
      this.digits[i].paint(pixels, function(x,y) {
        var offset = DigitOffset[i];
        return f(x+offset[0], y+offset[1]);
      })
    }
    return pixels;
  }
}

export default ThinNumberDisplay;
