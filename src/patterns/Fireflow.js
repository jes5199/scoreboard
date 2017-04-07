import Pixels from '../Pixels.js'

class Fireflow {
  constructor(scoreboard) {
    this.scoreboard = scoreboard;
  }

  render(time) {
    var pixels = new Pixels();
    var numberDisplays = [this.scoreboard.leftDisplay, this.scoreboard.rightDisplay];
    for(var d = 0; d < numberDisplays.length; d++) {
      var numberDisplay = numberDisplays[d];
      var number = numberDisplay.number;
      numberDisplay.paint(pixels, function(x,y) {
        var red = 0.75 + Math.max(0, Math.sin(y + time * number / 10)); //numberDisplay.number
        return [
          red,
          red - 1.,
          0,
          1,
        ];
      });
    }
    return pixels;
  }
}

export default Fireflow;
