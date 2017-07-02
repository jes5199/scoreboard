var mqtt = require('mqtt');
var client  = mqtt.connect('mqtt://localhost');

client.on('message', function (topic, message) {
  console.log(message.toString())
  client.end()
})

client.on('connect', function () {
  console.log("connected");
  client.subscribe("asOne/leftBpm");

  client.publish("asOne/leftBpm", "123", function(err) {
    console.log("left");
    console.log(err);
  });
  client.publish("asOne/rightBpm", "45");
});

setTimeout(function(){
  client.end();
}, 1000);

