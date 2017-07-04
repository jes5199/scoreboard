import Pixels from '../Pixels.js'

class WhiteSpark {
  constructor(scoreboard) {
    this.scoreboard = scoreboard;
    this.d = 0;
    this.x = 0;
    this.y = 20;
    this.lastMillis = 0;
  }

  moveSpark(bpm) {
    var nowMillis = (new Date()).getTime();
    if( nowMillis >= this.lastMillis + (1000 / bpm)) {
      this.lastMillis = nowMillis;
      this.x += Math.random() * (this.d ? -1 : 1);
      this.y -= Math.random() * 0.5;
    //this.d = 1;
    //this.x = 20;
    //this.y = 6;
    }
    if(this.y <= 0) {
      this.d = this.d ? 0 : 1;
      this.x = this.d ? 30 : 0;
      this.y = 18;
    }
  }

  render(time) {
    var pixels = new Pixels();
    var numberDisplays = [this.scoreboard.leftDisplay, this.scoreboard.rightDisplay];
    var whitespark = this;
    this.moveSpark(numberDisplays[this.d].number);
    for(var d = 0; d < numberDisplays.length; d++) {
      var numberDisplay = numberDisplays[d];
      var number = numberDisplay.number;
      var angle = 0.25 * Math.PI / 2 * (d * 2 - 1);
      numberDisplay.paint(pixels, function(x,y) {
        if(d == whitespark.d && x == Math.round(whitespark.x) && y == Math.round(whitespark.y)) {
          return [1,1,1,0.5];
        } else {
          return [0,0,0,0];
        };
      });
    }
    return pixels;
  }
}

export default WhiteSpark;
