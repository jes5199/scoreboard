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
      var angle = 0.25 * Math.PI / 2 * (d * 2 - 1);
      numberDisplay.paint(pixels, function(x,y) {
        var ty = (Math.sin(angle) * x + Math.cos(angle) * y) / 4 + time * Math.PI;
        //var red = 0.85 + Math.sin(ty + time * number / 10) + Math.sin(ty + time * number / 10 + Math.PI / 4);
        var red = 0.55 + Math.pow(Math.sin(ty), 2) + Math.sin(ty + Math.PI / 3) * 0.3;
        return [
          Math.max(0, red) + 0.01,
          Math.max(0, red - 1.) * 0.8 + 0.01,
          Math.max(0, 1 - red * 1.5) + 0.01,
          1,
        ];
      });
    }
    return pixels;
  }
}

export default Fireflow;
