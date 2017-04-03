class OpcChannel {
  constructor(opcHost, channelNumber, length) {
    this.opcHost = opcHost;
    this.channelNumber = channelNumber;
    this.length = length;
    this.colorCount = 3;
    this.colors = new Uint8ClampedArray(this.length * this.colorCount);

    this.second = 0;
    this.frameCount = 0;
  }

  setPixels(offset, colors) {
    this.colors.set(colors, offset * this.colorCount);
  }

  sendPixels() {
    this.countFPS();
    this.opcHost.sendPixels(this.channelNumber, this.colors);
    this.frameCount += 1;
  }

  countFPS() {
    let nowSecond = (new Date()).getTime()/1000|0;
    if(this.second != nowSecond) {
      if(this.frameCount > 0) {
        //console.log("FPS: " + this.frameCount);
      }
      this.frameCount = 0;
      this.second = nowSecond;
    }
  }
}

export default OpcChannel;
