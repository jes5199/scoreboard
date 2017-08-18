class MqttDirectOutput {
  constructor(client, channelToTopic) {
    this.client = client;
    this.channelToTopic = channelToTopic;
    this.client.publish("asOne/scoreboard/directOnly", new Buffer([1]));
    this.fps = 10;
    this.topicLastSent = {};
  }

  setAcceleration(level) {
    this.client.publish("asOne/scoreboard/acceleration", new Buffer([level]));
  }

  sendPixels(channel, colors) {
    let topic = this.channelToTopic[channel];
    let buffer = new Buffer(colors);
    let now = (new Date()).getTime();

    if(now - (this.topicLastSent[topic] || 0) > 1000 / this.fps) {
      this.topicLastSent[topic] = now;
      //console.log(topic + " " + buffer.length);
      //console.log(buffer);
      this.client.publish(topic, buffer);
    }
  }

  isAlive() {
    return true; // FIXME check connection
  }
}

export default MqttDirectOutput;
