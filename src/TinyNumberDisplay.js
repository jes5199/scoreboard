let DigitOffset = [
  [0,0], // 10s place
  [4,0], // 1s place
];

class TinyNumberDisplay {
  constructor(channel, digits) {
    this.channel = channel;
    this.digits = digits;
    this.number = 60;
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

export default TinyNumberDisplay;
