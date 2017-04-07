import Pixels from '../Pixels.js'

class MaskPattern {
  constructor(pattern, mask) {
    this.pattern = pattern;
    this.mask = mask;
  }

  render(time) {
    var colorPixels = this.pattern.render(time);
    var maskPixels = this.mask.render(time);
    return maskPixels.mask(colorPixels);
  }
}

export default MaskPattern;
