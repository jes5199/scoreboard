import Pixels from '../Pixels.js'

class Numeric {
  constructor(numberDisplay) {
    this.numberDisplay = numberDisplay;
  }

  render(time) {
    let pixels = new Pixels();
    this.numberDisplay.segments[Math.floor(time) % 16].paint(pixels, function(x,y) {
      return [
        Math.random(),
        Math.random(),
        Math.random(),
        1.0,
      ];
    });
    return pixels;
  }
}

export default Numeric;
