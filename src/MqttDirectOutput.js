class MqttDirectOutput {
  constructor(client, channelToTopic) {
    this.client = client;
    this.channelToTopic = channelToTopic;
    this.client.publish("asOne/scoreboard/directOnly", new Buffer([1]));
  }

  setAcceleration(level) {
    this.client.publish("asOne/scoreboard/acceleration", new Buffer([level]));
  }

  sendPixels(channel, colors) {
    let topic = this.channelToTopic[channel];
    this.client.publish(topic, new Buffer(colors));
  }

  isAlive {
    return true; // FIXME check connection
  }
}

export default MqttDirectOutput;
