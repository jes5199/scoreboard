import Pixels from '../Pixels.js'

class DifferenceShader {
  constructor(scoreboard) {
    this.scoreboard = scoreboard;
  }

  render(time) {
    var pixels = new Pixels();
    var numberDisplays = [this.scoreboard.leftDisplay, this.scoreboard.rightDisplay];
    var difference = this.scoreboard.leftDisplay.number - this.scoreboard.rightDisplay.number;
    for(var d = 0; d < numberDisplays.length; d++) {
      var numberDisplay = numberDisplays[d];
      if(d) { difference = -difference; }
      let red = Math.max(0, Math.min(difference / 10, 1));
      let blue = Math.max(0, Math.min(-difference / 10, 1));
      let color = Math.max(red, blue);
      numberDisplay.paint(pixels, function(x,y) {
        return [
          Math.max(red, blue / 3),
          blue / 3,
          blue,
          color
        ];
      });
    }
    return pixels;
  }
}

export default DifferenceShader;
