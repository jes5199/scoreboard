import Pixels from '../Pixels.js'

class FadeIn {
  constructor(displays) {
    this.displays = displays;
    this.lastRenderMillis = 0;
    this.fadeStartMillis = 0;
  }

  render(time) {
    var pixels = new Pixels();

    var alpha = 0;

    var now = (new Date()).getTime();

    if(now - this.lastRenderMillis > 500) {
      this.fadeStartMillis = now;
    }
    this.lastRenderMillis = now;

    alpha = 0.15 + 0.85 * (now - this.fadeStartMillis) / 1500;
    alpha = Math.max(0, Math.min(1, alpha));

    var displays = this.displays;
    for(var d = 0; d < displays.length; d++) {
      displays[d].paint(pixels, function(x,y) {
        return [
          0, 0, 0, alpha,
        ];
      });
    }
    return pixels;
  }
}

export default FadeIn;
