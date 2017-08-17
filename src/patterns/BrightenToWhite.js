import Pixels from '../Pixels.js'

class BrightenToWhite {
  constructor(pattern) {
    this.pattern = pattern;
    this.lastRenderMillis = 0;
    this.fadeStartMillis = 0;
  }

  render(time) {
    var outPixels = new Pixels();
    var inPixels = this.pattern.render(time);

    var now = (new Date()).getTime();

    if(now - this.lastRenderMillis > 500) {
      this.fadeStartMillis = now;
    }
    this.lastRenderMillis = now;

    let brightness = 0.0 + (now - this.fadeStartMillis) / 750;

    for(var channel in inPixels.dataByChannel) {
      let channelData = inPixels.dataByChannel[channel];
      for(var i = 0; i < channelData.length; i++) {
        let pixel = channelData[i];
        let myPixel = [
          Math.min(pixel[0] + brightness),
          Math.min(pixel[1] + brightness),
          Math.min(pixel[2] + brightness),
          pixel[3] + brightness,
        ];
        outPixels.set(channel, i, myPixel);
      }
    }

    return outPixels;
  }
}

export default BrightenToWhite;
