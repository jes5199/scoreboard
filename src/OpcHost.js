var net = require('net');

class OpcHost {
  constructor(host, port) {
    this.host = host;
    this.port = port;

    this.connected = false;
    this.connecting = false;
    this.reconnecting = true;

    this.onConnected = this.onConnected.bind(this);
    this.onClose = this.onClose.bind(this);
    this.onConnectError = this.onClose.bind(this);
    this.reconnect = this.reconnect.bind(this);

    this.client = new net.Socket();
    this.client.on("error", this.onConnectError);
    this.client.on("connect", this.onConnected);
    this.client.on("close", this.onClose);

    this.connect();
    this.reconnect();
  }

  setHost(host) {
    this.host = host;
  }

  sendPixels(channel, colors) {
    let command = 0; // set Pixels
    let size_high = colors.length / 256;
    let size_low = colors.length % 256;
    let header = new Buffer([channel, command, size_high, size_low]);
    // Apparently node doesn't have an explicit "flush"
    // so let's try to do one big write per message
    try {
      this.client.write(Buffer.concat([header, new Buffer(colors)]));
    } catch (e) {
      this.connected = false;
    }
  }

  reconnect() {
    if(this.reconnecting) {return;}
    this.connect();
    setTimeout(this.reconnect, 1000);
  }

  connect() {
    if(this.connected || this.connecting) {return;}
    this.connecting = true;
    //console.log("Connecting to " + this.host + ":" + this.port);
    this.client.connect(this.port, this.host);
  }

  onConnectError() {
    this.connecting = false;
  }

  onConnected() {
    this.connected = true;
    this.connecting = false;
  }

  onClose() {
    this.connected = false;
    this.connecting = false;
  }

  isAlive() {
    return this.connected;
  }
}

export default OpcHost;
