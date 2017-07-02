import WiringDiagram from './WiringDiagram.js'
import OpcHost from './OpcHost.js'

var mqtt = require('mqtt');
var client  = mqtt.connect('mqtt://localhost');
client.subscribe("asOne/leftBpm")
client.subscribe("asOne/rightBpm")

var opcHost = new OpcHost("localhost", 7890)
var scoreboard = (new WiringDiagram(opcHost)).scoreboard;
scoreboard.start();

client.on('message', function (topic, message) {
  message = message.toString();
  console.log([topic, message]);
  if(topic == "asOne/leftBpm") {
    scoreboard.setLeft(message);
  } else if(topic == "asOne/rightBpm") {
    scoreboard.setRight(message);
  }
});
