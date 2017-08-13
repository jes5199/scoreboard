import WiringDiagram from './WiringDiagram.js'
import OpcHost from './OpcHost.js'

var program = require('commander');

program
  .option('-m, --mqtt <hostname>', 'MQTT host')
  .option('-o, --opc <opc>', 'Open Pixel Controll host')
  .parse(process.argv);

if(!program.mqtt) {program.mqtt = "localhost";}
if(!program.opc) {program.opc = "localhost";}

var mqtt = require('mqtt');
var client = mqtt.connect('mqtt://' + program.mqtt);
client.subscribe("asOne/score/leftBPM")
client.subscribe("asOne/score/rightBPM")
client.subscribe("asOne/score/timer")
client.subscribe("asOne/score/logo")

var opcHost = new OpcHost(program.opc, 7890)
var scoreboard = (new WiringDiagram(opcHost)).scoreboard;
scoreboard.start();

client.on('message', function (topic, message) {
  console.log([topic, message]);
  if(topic == "asOne/score/leftBPM") {
    scoreboard.setLeft(message[0]);
  } else if(topic == "asOne/score/rightBPM") {
    scoreboard.setRight(message[0]);
  } else if(topic == "asOne/score/timer") {
    scoreboard.setTimer(message[0]);
  } else if(topic == "asOne/score/logo") {
    scoreboard.setLogoColor([message[0], message[1], message[2]]);
  }
});
