import Scoreboard from './Scoreboard.js'
import OpcChannel from './OpcChannel.js'
import Segment from './Segment.js'
import NumberDisplay from './NumberDisplay.js'

class WiringDiagram {
  constructor(opcHost) {
    this.opcHost = opcHost;
    this.leftOpcChannel = new OpcChannel(this.opcHost, 0, 368);
    this.rightOpcChannel = new OpcChannel(this.opcHost, 1, 368);

    let ledsInSegment = 7 + 9 + 7;

    this.leftDisplay = new NumberDisplay(
      this.leftOpcChannel,
      [
        // 100s
        new Segment(this.leftOpcChannel, 0 * ledsInSegment, true),
        new Segment(this.leftOpcChannel, 1 * ledsInSegment, true),

        // 10s
        new Segment(this.leftOpcChannel, 2 * ledsInSegment, false),
        new Segment(this.leftOpcChannel, 3 * ledsInSegment, true),
        new Segment(this.leftOpcChannel, 4 * ledsInSegment, true),
        new Segment(this.leftOpcChannel, 5 * ledsInSegment, false),
        new Segment(this.leftOpcChannel, 6 * ledsInSegment, true),
        new Segment(this.leftOpcChannel, 7 * ledsInSegment, true),
        new Segment(this.leftOpcChannel, 8 * ledsInSegment, false),

        // 1s
        new Segment(this.leftOpcChannel,  9 * ledsInSegment, false),
        new Segment(this.leftOpcChannel, 10 * ledsInSegment, true),
        new Segment(this.leftOpcChannel, 11 * ledsInSegment, true),
        new Segment(this.leftOpcChannel, 12 * ledsInSegment, false),
        new Segment(this.leftOpcChannel, 13 * ledsInSegment, true),
        new Segment(this.leftOpcChannel, 14 * ledsInSegment, true),
        new Segment(this.leftOpcChannel, 15 * ledsInSegment, false),
      ]
    );

    this.rightDisplay = new NumberDisplay(
      this.rightOpcChannel,
      [
        // 100s
        new Segment(this.rightOpcChannel, 0 * ledsInSegment, true),
        new Segment(this.rightOpcChannel, 1 * ledsInSegment, true),

        // 10s
        new Segment(this.rightOpcChannel, 2 * ledsInSegment, false),
        new Segment(this.rightOpcChannel, 3 * ledsInSegment, true),
        new Segment(this.rightOpcChannel, 4 * ledsInSegment, true),
        new Segment(this.rightOpcChannel, 5 * ledsInSegment, false),
        new Segment(this.rightOpcChannel, 6 * ledsInSegment, true),
        new Segment(this.rightOpcChannel, 7 * ledsInSegment, true),
        new Segment(this.rightOpcChannel, 8 * ledsInSegment, false),

        // 1s
        new Segment(this.rightOpcChannel,  9 * ledsInSegment, false),
        new Segment(this.rightOpcChannel, 10 * ledsInSegment, true),
        new Segment(this.rightOpcChannel, 11 * ledsInSegment, true),
        new Segment(this.rightOpcChannel, 12 * ledsInSegment, false),
        new Segment(this.rightOpcChannel, 13 * ledsInSegment, true),
        new Segment(this.rightOpcChannel, 14 * ledsInSegment, true),
        new Segment(this.rightOpcChannel, 15 * ledsInSegment, false),
      ]
    );

    this.scoreboard = new Scoreboard(this.leftDisplay, this.rightDisplay);
  }
}

export default WiringDiagram;
