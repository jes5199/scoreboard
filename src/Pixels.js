class Pixels {
  constructor() {
    this.dataByChannel = {}
  }

  set(ch, n, rgba) {
    if(this.dataByChannel[ch] === undefined) {
      this.dataByChannel[ch] = [];
    }
    let channelData = this.dataByChannel[ch];

    channelData[n] = rgba;
  }

  mask(pixels) {
  }

  combile(pixels) {

  }

  write(channels) {
    for(var ch in this.dataByChannel) {
      var channel = channels[ch];
      var data = this.dataByChannel[ch];
      if(channel) {
        for(var i = 0; i < data.length; i++) {
          if(data[i]) {
            channel.colors[i*3 + 0] = data[i][0] * 255;
            channel.colors[i*3 + 1] = data[i][1] * 255;
            channel.colors[i*3 + 2] = data[i][2] * 255;
          }
        }
      }
    }
  }
}

export default Pixels;
