import WiringDiagram from './WiringDiagram.js'
const readline = require('readline');
import OpcHost from './OpcHost.js'

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

var opcHost = new OpcHost("localhost", 7890)
var scoreboard = (new WiringDiagram(opcHost)).scoreboard;
scoreboard.start();

var ask = function() {
  rl.question('L BPM? ', (answer) => {
    if(answer === ''){
      rl.close();
    } else {
      scoreboard.setLeft(answer);
      rl.question('R BPM ? ', (answer) => {
        if(answer === ''){
          rl.close();
        } else {
          scoreboard.setRight(answer);
          setTimeout(ask, 100);
        }
      });
    }
  });
}

ask();
