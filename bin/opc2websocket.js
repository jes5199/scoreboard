const WebSocket = require('ws');
var net = require('net');

var ws;

var httpPort = 8099;
var opcPort = 7890;

const wss = new WebSocket.Server({
  perMessageDeflate: false,
  port: httpPort
});

wss.on('connection', function connection(ws_) {
  console.log("websocket connected");
  ws = ws_;
});

var lastDataSize = 0;
var lastFrameSize = 0;
var frames = 0;
var frameSecond = 0;
var reportFrequency = 10;
var buffer = new Buffer(0);

function sendWebsocketFrames() {
  var currentSecond = Math.floor((new Date()).getTime() / 1000 / reportFrequency);
  if(frameSecond != currentSecond) {
    if(frames != 0) {
      console.log(frames / reportFrequency + " fps");
    }
    frames = 0;
    frameSecond = currentSecond;
  }

  var frameSize = buffer[2] * 256 + buffer[3] + 4;
  if(frameSize >= buffer.length) {
    frames += 1;
    if(ws) {
      var frame = buffer.slice(0, frameSize);
      if(frameSize != lastFrameSize) {
        console.log("sending " + frameSize + " bytes");
        lastFrameSize = frameSize;
      }
      ws.send(frame);
    }
    buffer = buffer.slice(frameSize);
  }
}

var opc = net.createServer(function(socket) {
  socket.on('data', function(data){
    if(data.length != lastDataSize) {
      console.log("got " + data.length + " bytes");
      lastDataSize = data.length;
    }
    buffer = Buffer.concat([buffer, data]);
    sendWebsocketFrames();
  });
});

opc.listen(opcPort, '127.0.0.1');

console.log("Listening OPC on " + opcPort + ", listening HTTP sockets on " + httpPort + ".");
