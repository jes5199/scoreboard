import WiringDiagram from './WiringDiagram.js'

document.leftColors = [];
document.rightColors = [];

var fakeHost = {
  connect: function(){},
  sendPixels: function(channel, colors) {
    colors = Array.from(colors);
    if(channel == 0) {
      document.leftColors = colors;
    } else {
      document.rightColors = colors;
    }
  }
}

var scoreboard = (new WiringDiagram(fakeHost)).scoreboard;
scoreboard.start();

document.setLeft = function(x) {
  scoreboard.setLeft(x);
}

document.setRight = function(x) {
  scoreboard.setRight(x);
}
