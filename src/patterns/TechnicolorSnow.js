import Pixels from '../Pixels.js'

class TechnicolorSnow {
  constructor(displays) {
    this.displays = displays;
  }

  render(time) {
    var pixels = new Pixels();
    var displays = this.displays;
    for(var d = 0; d < displays.length; d++) {
      displays[d].paint(pixels, function(x,y) {
        return [
          Math.random(),
          Math.random(),
          Math.random(),
          1,
        ];
      });
    }
    return pixels;
  }
}

export default TechnicolorSnow;
