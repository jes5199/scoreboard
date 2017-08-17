import WiringDiagram from './WiringDiagram.js'

var fakeHost = {
  connect: function(){},
  sendPixels: function(channel, colors) {
    colors = Array.from(colors);
    for(let i = 0; i < document.pixels[channel].length; i++) {
      document.pixels[channel][i] = colors[i];
    }
  }
}

var scoreboard = (new WiringDiagram(fakeHost)).scoreboard;
scoreboard.start();

document.setState = function(x) {
  scoreboard.setState(x);
}

document.setLeft = function(x) {
  scoreboard.setLeft(x);
}

document.setRight = function(x) {
  scoreboard.setRight(x);
}

document.setTimer = function(x) {
  scoreboard.setTimer(x);
}

document.setLogoColor = function(x) {
  scoreboard.setLogoColor(x);
}
