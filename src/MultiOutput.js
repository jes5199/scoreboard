class MultiOutput {
  constructor(outputs) {
    this.outputs = outputs;
  }

  sendPixels(channel, colors) {
    // find the first alive output
    for(var i = 0; i < this.outputs.length; i++) {
      let output = this.outputs[i];
      // delegate sendPixels there
      if(output.isAlive()) {
        return output.sendPixels(channel, colors);
      }
    }
  }
}

export default MultiOutput;
