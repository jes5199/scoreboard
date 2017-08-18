import Pixels from '../Pixels.js'

class Fireflow {
  constructor(scoreboard) {
    this.scoreboard = scoreboard;
    this.offsets = [0, 0];
    var nowMillis = (new Date()).getTime();
    this.lastMillis = [nowMillis, nowMillis];
  }

  moveOffset(time, n, bpm) {
    var nowMillis = time * 1000;
    var diffMillis = (nowMillis - this.lastMillis[n])
    this.offsets[n] += bpm / 60 * diffMillis / 1000 / 2;
    this.lastMillis[n] = nowMillis;
    this.offsets[n] %= 1.0;
  }

  render(time) {
    var pixels = new Pixels();
    var numberDisplays = [this.scoreboard.leftDisplay, this.scoreboard.rightDisplay];
    for(var d = 0; d < numberDisplays.length; d++) {
      var numberDisplay = numberDisplays[d];
      var number = numberDisplay.number;
      var angle = 0.30 * Math.PI / 2 * (d * 2 - 1);
      this.moveOffset(time, d, number);
      var offset = this.offsets[d];
      numberDisplay.paint(pixels, function(x,y) {
        //var ty = (Math.sin(angle) * x + Math.cos(angle) * y) / 4 + time * Math.PI * number / 60;
        var ty = (Math.sin(angle) * x + Math.cos(angle) * y) / 4 + offset * Math.PI * 2;
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
