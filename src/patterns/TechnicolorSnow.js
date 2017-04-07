import Pixels from '../Pixels.js'

class TechnicolorSnow {
  constructor(scoreboard) {
    this.scoreboard = scoreboard;
  }

  render(time) {
    var pixels = new Pixels();
    var numberDisplays = [this.scoreboard.leftDisplay, this.scoreboard.rightDisplay];
    for(var d = 0; d < numberDisplays.length; d++) {
      var numberDisplay = numberDisplays[d];
      for(var i = 0; i < 16; i++) {
        numberDisplay.segments[i].paint(pixels, function(x,y) {
          return [
            Math.random(),
            Math.random(),
            Math.random(),
            1,
          ];
        });
      }
    }
    return pixels;
  }
}

export default TechnicolorSnow;
