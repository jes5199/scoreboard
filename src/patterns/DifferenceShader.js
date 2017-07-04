import Pixels from '../Pixels.js'

class DifferenceShader {
  constructor(scoreboard) {
    this.scoreboard = scoreboard;
    var nowMillis = (new Date()).getTime();
    this.lastMillis = [nowMillis, nowMillis];
  }

  render(time) {
    var pixels = new Pixels();
    var numberDisplays = [this.scoreboard.leftDisplay, this.scoreboard.rightDisplay];
    var difference = this.scoreboard.leftDisplay.number - this.scoreboard.rightDisplay.number;
    for(var d = 0; d < numberDisplays.length; d++) {
      var numberDisplay = numberDisplays[d];
      var nowMillis = (new Date()).getTime();
      var t = Math.min(1, Math.abs(difference) / 60) * Math.sign(difference);
      if(d) { t = -t; }
      numberDisplay.paint(pixels, function(x,y) {
        return [
          Math.max(0, t) + Math.max(0, -t * 0.5),
          0,
          Math.max(0, -t),
          Math.abs(t * 0.75)
        ];
      });
    }
    return pixels;
  }
}

export default DifferenceShader;
