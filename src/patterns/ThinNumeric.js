import Pixels from '../Pixels.js'
import ThinNumericFont from './fonts/ThinNumeric.js'

class ThinNumeric {
  constructor(numberDisplay) {
    this.numberDisplay = numberDisplay;
  }

  render(time) {
    let pixels = new Pixels();
    let number = this.numberDisplay.number;

    var off = [0,0,0,0];
    var  on = [1,1,1,1];

    // 100s place
    this.numberDisplay.digits[2].paint(pixels, function(x,y) {
      if(number >= 100) { return on; } else { return off; }
    });

    // 10s place
    let tens = Math.floor(number / 10) % 10;
    let tensBmp = ThinNumericFont[tens];
    this.numberDisplay.digits[1].paint(pixels, function(x,y) {
      if(tensBmp[y][x]) { return on; } else { return off; }
    });

    // 1s place
    let ones = number % 10;
    let onesBmp = ThinNumericFont[ones];
    this.numberDisplay.digits[0].paint(pixels, function(x,y) {
      if(onesBmp[y][x]) { return on; } else { return off; }
    });

    return pixels;
  }
}

export default ThinNumeric;
