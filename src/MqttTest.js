var mqtt = require('mqtt');
var client  = mqtt.connect('mqtt://localhost');

client.on('message', function (topic, message) {
  console.log(message.toString())
  client.end()
})

leftBpm = 40;
rightBpm = 40;

client.on('connect', function () {
  console.log("connected");
  measureHearts();
});

function measureHearts() {
  leftBpm += Math.random() * 10 - 5;
  leftBpm = Math.max(40, leftBpm);
  leftBpm = Math.min(180, leftBpm);
  leftBpm = Math.round(leftBpm);

  rightBpm += Math.random() * 10 - 5;
  rightBpm = Math.max(40, rightBpm);
  rightBpm = Math.min(180, rightBpm);
  rightBpm = Math.round(rightBpm);

  client.publish("asOne/leftBpm", ""+leftBpm);
  client.publish("asOne/rightBpm", ""+rightBpm);
  setTimeout(measureHearts, 500);
}

//setTimeout(function(){
//  client.end();
//}, 1000);

