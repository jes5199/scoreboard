import Pixels from '../Pixels.js'

class BlinkyTimer {
  constructor(numberDisplay) {
    this.numberDisplay = numberDisplay;
    this.changedAt = 0;
    this.lastValue = -1;
  }

  render(time) {
    let pixels = new Pixels();
    let number = this.numberDisplay.number;

    if(number != this.lastValue) {
      this.lastValue = number;
      this.changedAt = time;
    }

    let d = 1 - (time - this.changedAt);
    let n = 9 * d / 10 + 0.1;

    let color = [n, n, 0, 1];

    for(var i = 0; i < 2; i++) {
      this.numberDisplay.digits[i].paint(pixels, function(x,y) {
        return color;
      });
    }
    return pixels;
  }
}

export default BlinkyTimer;
