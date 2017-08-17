import Pixels from '../Pixels.js'
import ThinFont from './fonts/Thin.js'

let titles = [
  "AS1 ",
  "AS1 ",
  "AS1 ",
  "AS1 ",
  "AS  ONE ",
  "AS   ONE",
  " AS ONE ",
  " AS  ONE",
  "  ASONE ",
  "  AS ONE",
];

let words = [
  "PLAYTHIS",
  "PLAYHERE",
  "LOVEPLAY",
  "FUCK YOU",
  "HARTBEAT",
  "HARTBEAT",
  "HARTBEAT",
  "ONE LOVE",
  " ONELOVE",
  "SOULMATE",
  "FIREPOOF",
  "FIRE",
  "BURN",
  "SYNC  UP",
  "GAMEOVER",
  "SEXYTIME",
  "HI    HI",
  ];


class ThinWords {
  constructor(leftNumberDisplay, rightNumberDisplay) {
    this.leftNumberDisplay = leftNumberDisplay;
    this.rightNumberDisplay = rightNumberDisplay;
    this.lastWordTime = 0;
    this.word = "TEST";
    this.half = 0;
    this.lastHalfWordTime = 0;
    this.title = 0;
  }

  render(time) {
    let now = new Date().getTime();
    if(now - this.lastWordTime > 8000) {
      this.title = !this.title;
      this.lastWordTime = now;
      this.lastHalfWordTime = now;
      let vocabulary = this.title ? titles : words;
      this.word = vocabulary[Math.floor(Math.random() * vocabulary.length)];
      this.half = 0;
    } else if(now - this.lastHalfWordTime > 2000) {
      this.lastHalfWordTime = now;
      this.half = !this.half;
    }
    let idx = (this.word.length > 4) ? Math.floor(this.half * this.word.length/2) : 0;
    let show = this.word.substr(idx, 4);

    let pixels = new Pixels();

    var off = [0,0,0,0];
    var  on = [1,1,1,1];

    // 100s places are just off
    this.leftNumberDisplay.digits[2].paint(pixels, function(x,y) {
      return off;
    });
    this.rightNumberDisplay.digits[2].paint(pixels, function(x,y) {
      return off;
    });

    // L 10s place
    let leftTens = show[0];
    let leftTensBmp = ThinFont[leftTens];
    this.leftNumberDisplay.digits[1].paint(pixels, function(x,y) {
      if(leftTensBmp[y][x]) { return on; } else { return off; }
    });

    // L 1s place
    let leftOnes = show[1];
    let leftOnesBmp = ThinFont[leftOnes];
    this.leftNumberDisplay.digits[0].paint(pixels, function(x,y) {
      if(leftOnesBmp[y][x]) { return on; } else { return off; }
    });

    // R 10s place
    let rightTens = show[2];
    let rightTensBmp = ThinFont[rightTens];
    this.rightNumberDisplay.digits[1].paint(pixels, function(x,y) {
      if(rightTensBmp[y][x]) { return on; } else { return off; }
    });

    // R 1s place
    let rightOnes = show[3];
    let rightOnesBmp = ThinFont[rightOnes];
    this.rightNumberDisplay.digits[0].paint(pixels, function(x,y) {
      if(rightOnesBmp[y][x]) { return on; } else { return off; }
    });

    return pixels;
  }
}

export default ThinWords;
