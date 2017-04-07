import Pixels from '../Pixels.js'

class MergePatterns {
  constructor(patterns) {
    this.patterns = patterns;
  }

  render(time) {
    var pixels = new Pixels();
    for(var i = 0; i < this.patterns.length; i++) {
      var newPixels = this.patterns[i].render(time);
      pixels = newPixels.combine(pixels);
    }
    return pixels;
  }
}

export default MergePatterns;
