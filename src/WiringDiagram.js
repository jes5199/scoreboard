import Scoreboard from './Scoreboard.js'
import OpcChannel from './OpcChannel.js'
import ThinNumberDisplay from './ThinNumberDisplay.js'
import ThinDigit from './ThinDigit.js'
import ThinOne from './ThinOne.js'
import TinyNumberDisplay from './TinyNumberDisplay.js'
import TinyDigit from './TinyDigit.js'
import LogoDisplay from './LogoDisplay.js'

class WiringDiagram {
  constructor(opcHost) {
    // TODO: MQTT/OPC shared driver
    this.opcHost = opcHost;
    this.rightOpcChannel = new OpcChannel(this.opcHost, 1, 47);
    this.logoOpcChannel = new OpcChannel(this.opcHost, 2, 15);
    this.timerOpcChannel = new OpcChannel(this.opcHost, 3, 26);
    this.leftOpcChannel = new OpcChannel(this.opcHost, 4, 47);

    this.leftDisplay = new ThinNumberDisplay(
      this.leftOpcChannel,
      [
        // 1s
        new ThinDigit(this.leftOpcChannel, 0),

        // 10s
        new ThinDigit(this.leftOpcChannel, 20),

        // 100s
        new ThinOne(this.leftOpcChannel, 40),
      ]
    );

    this.rightDisplay = new ThinNumberDisplay(
      this.rightOpcChannel,
      [
        // 1s
        new ThinDigit(this.rightOpcChannel, 0),

        // 10s
        new ThinDigit(this.rightOpcChannel, 20),

        // 100s
        new ThinOne(this.rightOpcChannel, 40),
      ]
    );

    this.timerDisplay = new TinyNumberDisplay(
      this.timerOpcChannel,
      [
        // 1s
        new TinyDigit(this.timerOpcChannel, 0),

        // 10s
        new TinyDigit(this.timerOpcChannel, 13),
      ]
    );

    this.logoDisplay = new LogoDisplay(this.logoOpcChannel);

    this.scoreboard = new Scoreboard(this.leftDisplay, this.rightDisplay, this.timerDisplay, this.logoDisplay);
  }
}

export default WiringDiagram;
