import Pixels from '../Pixels.js'

let SevenSegment = {
  "0": 0b0111111,
  "1": 0b0000110,
  "2": 0b1011011,
  "3": 0b1001111,
  "4": 0b1100110,
  "5": 0b1101101,
  "6": 0b1111101,
  "7": 0b0000111,
  "8": 0b1111111,
  "9": 0b1101111,
}

class Numeric {
  constructor(numberDisplay) {
    this.numberDisplay = numberDisplay;
  }

  render(time) {
    let pixels = new Pixels();
    let number = this.numberDisplay.number;
    var color = [0,0,0,0];
    if(number >= 100) {
      color = [1,1,1,1];
    }
    this.numberDisplay.segments[0].paint(pixels, function(x,y) {
      return color;
    });
    this.numberDisplay.segments[1].paint(pixels, function(x,y) {
      return color;
    });

    var digit1 = Math.floor(number / 10) % 10;
    var bits = SevenSegment[digit1];
    for(var i = 0; i < 7; i++) {
      var color = [0,0,0,0];
      if((bits >> i) & 1) {
        color = [1,1,1,1];
      }
      this.numberDisplay.segments[i+2].paint(pixels, function(x,y) {
        return color;
      });
    }
    var digit2 = number % 10;
    var bits = SevenSegment[digit2];
    for(var i = 0; i < 7; i++) {
      var color = [0,0,0,0];
      if((bits >> i) & 1) {
        color = [1,1,1,1];
      }
      this.numberDisplay.segments[i+9].paint(pixels, function(x,y) {
        return color;
      });
    }
    return pixels;
  }
}

export default Numeric;
