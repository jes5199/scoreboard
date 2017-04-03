var net = require('net');

class OpcHost {
  constructor(host, port) {
    this.host = host;
    this.port = port;
    this.client = new net.Socket();

    this.connected = false;
    this.connecting = false;

    this.onConnected = this.onConnected.bind(this);
    this.onClose = this.onClose.bind(this);

    this.connect();
  }

  sendPixels(channel, colors) {
    if(!this.connected) {
      this.connect();
      return;
    }
    let command = 0; // set Pixels
    let size_high = colors.length / 256;
    let size_low = colors.length % 256;
    let header = new Buffer([channel, command, size_high, size_low]);
    this.client.write(header)
    this.client.write(new Buffer(colors));
  }

  connect() {
    if(this.connected || this.connecting) {return;}
    this.connecting = true;
    console.log("Connecting to " + this.host + ":" + this.port);
    this.client.connect(this.port, this.host, this.onConnected);
  }

  onConnected() {
    this.connected = true;
    this.connecting = false;
  }

  onClose() {
    this.connected = false;
    this.connecting = false;
  }
}

export default OpcHost;
