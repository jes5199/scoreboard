import Pixels from '../Pixels.js'

class HueFade {
  constructor(logoDisplay) {
    this.logoDisplay = logoDisplay;
    this.color = [0,0,255];
    this.step = 1;
  }

  render(time) {
    let pixels = new Pixels();

    let destColor = this.logoDisplay.color;

    let color = this.color;
    for(var i = 0; i < 3; i++) {
      if(color[i] > destColor[i]) {
        color[i] -= this.step;
      } else if(color[i] < destColor[i]) {
        color[i] += this.step;
      }
    }

    this.logoDisplay.paint(pixels, function(x,y) {
      return [color[0] / 255, color[1] / 255, color[2] / 255, 1] // RGBA
    });

    return pixels;
  }
}

export default HueFade;
