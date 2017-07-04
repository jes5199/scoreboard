import WiringDiagram from './WiringDiagram.js'
import OpcHost from './OpcHost.js'

var program = require('commander');

program
  .option('-m, --mqtt <hostname>', 'MQTT host')
  .option('-o, --opc <opc>', 'Open Pixel Controll host')
  .parse(process.argv);

if(!program.mqtt) {program.mqtt = "localhost";}
if(!program.opc) {program.opc = "localhost";}
console.log(program.mqtt);
console.log(program.opc);

var mqtt = require('mqtt');
var client = mqtt.connect('mqtt://' + program.mqtt);
client.subscribe("asOne/leftBpm")
client.subscribe("asOne/rightBpm")

var opcHost = new OpcHost(program.opc, 7890)
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
