import Pixels from '../Pixels.js'

let NumberShapes = {
  "0": [
    [1,1,1],
    [1,0,1],
    [1,0,1],
    [1,0,1],
    [1,1,1],
  ],
  "1": [
    [0,0,1],
    [0,0,1],
    [0,0,1],
    [0,0,1],
    [0,0,1],
  ],
  "2": [
    [1,1,1],
    [0,0,1],
    [1,1,1],
    [1,0,0],
    [1,1,1],
  ],
  "3": [
    [1,1,1],
    [0,0,1],
    [1,1,1],
    [0,0,1],
    [1,1,1],
  ],
  "4": [
    [1,0,1],
    [1,0,1],
    [1,1,1],
    [0,0,1],
    [0,0,1],
  ],
  "5": [
    [1,1,1],
    [1,0,0],
    [1,1,1],
    [0,0,1],
    [1,1,1],
  ],
  "6": [
    [1,1,1],
    [1,0,0],
    [1,1,1],
    [1,0,1],
    [1,1,1],
  ],
  "7": [
    [1,1,1],
    [0,0,1],
    [0,0,1],
    [0,0,1],
    [0,0,1],
  ],
  "8": [
    [1,1,1],
    [1,0,1],
    [1,1,1],
    [1,0,1],
    [1,1,1],
  ],
  "9": [
    [1,1,1],
    [1,0,1],
    [1,1,1],
    [0,0,1],
    [0,1,1],
  ],
};

class TinyNumeric {
  constructor(numberDisplay) {
    this.numberDisplay = numberDisplay;
  }

  render(time) {
    let pixels = new Pixels();
    let number = this.numberDisplay.number;

    var off = [0,0,0,0];
    var  on = [1,1,1,1];

    // 10s place
    let tens = Math.floor(number / 10) % 10;
    let tensBmp = NumberShapes[tens];
    this.numberDisplay.digits[1].paint(pixels, function(x,y) {
      if(tensBmp[y][x]) { return on; } else { return off; }
    });

    // 1s place
    let ones = number % 10;
    let onesBmp = NumberShapes[ones];
    this.numberDisplay.digits[0].paint(pixels, function(x,y) {
      if(onesBmp[y][x]) { return on; } else { return off; }
    });

    return pixels;
  }
}

export default TinyNumeric;
