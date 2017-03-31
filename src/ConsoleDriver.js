import Scoreboard from './Scoreboard.js'
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

var ask = function() {
  rl.question('BPM A? ', (answer) => {
    if(answer === ''){
      rl.close();
    } else {
      rl.question('BPM B? ', (answer) => {
        if(answer === ''){
          rl.close();
        } else {
          setImmediate(ask);
        }
      });
    }
  });
}

ask();
