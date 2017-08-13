class LogoDisplay {
  constructor(channel) {
    this.channel = channel;
    this.color = [255,0,0];
    this.width = 5;
    this.height = 3;
  }

  update(color) {
    this.color = color;
  }

  pixelIdForXY(x,y) {
    let pixels = [
      [14, 9, 8, 3, 2],
      [13, 10, 7, 4, 1],
      [12, 11, 6, 5, 0]
    ];

    return pixels[y][x];
  }

  paint(pixels, f) {
    for(var x = 0; x < this.width; x++) {
      for(var y = 0; y < this.height; y++) {
        pixels.set(this.channel.channelNumber, this.pixelIdForXY(x,y), f(x, y));
      }
    }
  }
}

export default LogoDisplay;
