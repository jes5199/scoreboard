import Pixels from '../Pixels.js'

class RedCells{
  constructor(scoreboard) {
    this.scoreboard = scoreboard;
    this.d = 0;
    this.x = 0;
    this.y = 20;
    this.lastMillis = 0;
    this.leftCells = [];
    this.rightCells = [];
    for(var i = 0; i < 20; i++) {
      this.leftCells.push([Math.random() * 30, Math.random() * 18, 0.5 + 0.5 * Math.random(), 0.5 * Math.random()]);
      this.rightCells.push([Math.random() * 30, Math.random() * 18, 0.5 + 0.5 * Math.random(), 0.5 * Math.random()]);
    }
    this.lastMillis = [0,0];
  }

  moveCells(time, d, bpm) {
    var cells = d ? this.rightCells : this.leftCells;
    var nowMillis = time * 1000;
    if( nowMillis >= this.lastMillis[d] + (1000 / bpm)) {
      this.lastMillis[d] = nowMillis;

      for(var i = 0; i < cells.length; i++) {
        var cell = cells[i];
        cell[0] += Math.random() * (d ? -1 : 1);
        cell[1] -= Math.random() * 0.5;
        cell[0] += 30;
        cell[0] %= 30;
        if(cell[1] <= 0) {
          cell[1] = 18;
        }
      }
    }
  }

  render(time) {
    var pixels = new Pixels();
    var numberDisplays = [this.scoreboard.leftDisplay, this.scoreboard.rightDisplay];
    var cellpos = this;
    for(var d = 0; d < numberDisplays.length; d++) {
      this.moveCells(time, d, numberDisplays[this.d].number);
      var numberDisplay = numberDisplays[d];
      var number = numberDisplay.number;
      var angle = 0.25 * Math.PI / 2 * (d * 2 - 1);
      var cells = d ? this.rightCells : this.leftCells;
      numberDisplay.paint(pixels, function(x,y) {
        for(var i = 0; i < cells.length; i++) {
          if(x == Math.round(cells[i][0]) && y == Math.round(cells[i][1])) {
            return [cells[i][2],0,cells[i][3],0.8];
          }
        }
        return [0,0,0,0];
      });
    }
    return pixels;
  }
}

export default RedCells;
