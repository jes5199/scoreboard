const WebSocket = require('ws');
var net = require('net');

var ws;

const wss = new WebSocket.Server({
  perMessageDeflate: false,
  port: 8099
});

wss.on('connection', function connection(ws_) {
  console.log("websocket connected");
  ws = ws_;
});

var opc = net.createServer(function(socket) {
  socket.on('data', function(data){
    console.log("got " + data.length + " bytes");
    if(ws) {
      ws.send(data);
    }
  });
});

opc.listen(7890, '127.0.0.1');
