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

  mask(that) {
    let result = new Pixels();
    for(var ch in this.dataByChannel) {
      if(ch in that.dataByChannel) {
        let len = Math.min(this.dataByChannel[ch].length, that.dataByChannel[ch].length);
        for(var i = 0; i < len; i++) {
          let thisC = this.dataByChannel[ch][i];
          let thatC = that.dataByChannel[ch][i];
          if(thisC && thatC) {
            let alpha = thisC[3];
            let r = thatC[0] * alpha;
            let g = thatC[1] * alpha;
            let b = thatC[2] * alpha;
            let a = alpha;
            result.set(ch, i, [r,g,b,a]);
          }
        }
      }
    }
    return result;
  }

  combine(that) {
    let result = new Pixels();
    for(var ch in this.dataByChannel) {
      if(!(ch in that.dataByChannel)) {
        result.dataByChannel[ch] = this.dataByChannel[ch];
      } else {
        let len = Math.max(this.dataByChannel[ch].length, that.dataByChannel[ch].length);
        for(var i = 0; i < len; i++) {
          let thisC = this.dataByChannel[ch][i];
          let thatC = that.dataByChannel[ch][i];
          if(! thisC) {
            result.set(ch, i, thatC);
          } else if(! thatC) {
            result.set(ch, i, thisC);
          } else {
            let alpha = thisC[3];
            let r = thisC[0] * alpha + thatC[0] * (1-alpha);
            let g = thisC[1] * alpha + thatC[1] * (1-alpha);
            let b = thisC[2] * alpha + thatC[2] * (1-alpha);
            let a = thatC[3];
            result.set(ch, i, [r,g,b,a]);
          }
        }
      }
    }
    for(ch in that.dataByChannel) {
      if(!(ch in this.dataByChannel)) {
        result.dataByChannel[ch] = that.dataByChannel[ch];
      }
    }
    return result;
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
