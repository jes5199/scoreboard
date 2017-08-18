class MultiOutput {
  constructor(outputs) {
    this.outputs = outputs;
    this.lastAlive = -1;
  }

  sendPixels(channel, colors) {
    // find the first alive output
    for(var i = 0; i < this.outputs.length; i++) {
      let output = this.outputs[i];
      // delegate sendPixels there
      if(output.isAlive()) {
        if(this.lastAlive != i) {
          console.log("switched to output " + output.constructor.name);
          this.lastAlive = i;
        }
        return output.sendPixels(channel, colors);
      }
    }
  }
}

export default MultiOutput;
