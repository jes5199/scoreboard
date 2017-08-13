import NumberDisplay from './NumberDisplay.js'
import Numeric from './patterns/Numeric.js'
import TechnicolorSnow from './patterns/TechnicolorSnow.js'
import Fireflow from './patterns/Fireflow.js'
import DifferenceShader from './patterns/DifferenceShader.js'
import WhiteSpark from './patterns/WhiteSpark.js'
import RedCells from './patterns/RedCells.js'
import MergePatterns from './patterns/MergePatterns.js'
import MaskPattern from './patterns/MaskPattern.js'
import ThinNumeric from './patterns/ThinNumeric.js'

class Scoreboard {
  constructor(leftDisplay, rightDisplay) {
    this.leftScore = 0;
    this.rightScore = 0;

    this.fps = 32; // frames per second
    this.leftNextFrameTime = 0;
    this.rightNextFrameTime = (new Date()).getTime() + this.frameDuration() / 2; // interlace left and right updates

    this.running = false;

    this.leftDisplay = leftDisplay;
    this.rightDisplay = rightDisplay;

    this.pattern = new MaskPattern(
     new MergePatterns([ new Fireflow(this), new DifferenceShader(this) ]),
     new MergePatterns([
       new ThinNumeric(this.leftDisplay), new ThinNumeric(this.rightDisplay)
     ])
    );

    this.main = this.main.bind(this);
  }

  setLeft(score) {
    this.leftScore = score;
    this.leftDisplay.update(this.leftScore);
  }

  setRight(score) {
    this.rightScore = score;
    this.rightDisplay.update(this.rightScore);
  }

  start() {
    console.log("STARTING SCOREBOARD UPDATES");
    this.running = true;
    setImmediate(this.main);
  }

  stop() {
    this.running = false;
  }

  frameDuration() { // in milliseconds
    return 1000 / this.fps;
  }

  renderPattern() {
    var pixels = this.pattern.render(new Date().getTime() / 1000);

    console.log(pixels);

    pixels.write({
      "3": this.leftDisplay.channel,
      "0": this.rightDisplay.channel,
    });
  }

  main() {
    if( ! this.running ) {
      console.log("stopped");
      return;
    }
    let now = (new Date()).getTime();

    this.renderPattern();

    if(this.leftNextFrameTime <= now) {
      this.updateLeft();
      this.leftDisplay.channel.sendPixels();
    } else {
      if(this.rightNextFrameTime <= now) {
        this.updateRight()
        this.rightDisplay.channel.sendPixels();
      }
    }

    let msTilNextUpdate = Math.min(
      this.leftNextFrameTime,
      this.rightNextFrameTime,
    ) - now;

    setTimeout(this.main, msTilNextUpdate);
  }

  updateLeft() {
    let now = (new Date()).getTime();
    this.leftNextFrameTime = now + this.frameDuration();
  }

  updateRight() {
    let now = (new Date()).getTime();
    this.rightNextFrameTime = now + this.frameDuration();
  }
}

export default Scoreboard;
