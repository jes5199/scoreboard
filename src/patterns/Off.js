import Pixels from '../Pixels.js'

class Off {
  constructor(scoreboard) {
    this.scoreboard = scoreboard;
  }

  render(time) {
    var pixels = new Pixels();
    var displays = [this.scoreboard.leftDisplay, this.scoreboard.rightDisplay, this.scoreboard.logoDisplay, this.scoreboard.timerDisplay];
    for(var d = 0; d < displays.length; d++) {
      displays[d].paint(pixels, function(x,y) {
        return [
          0, 0, 0, 1,
        ];
      });
    }
    return pixels;
  }
}

export default Off;
