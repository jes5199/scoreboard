# Browser-only pattern demo

```
open public/emulator.html
```

# Browser using live data
```
npm install
# each of these commands needs to run in a separate tmux pane or whatever:
mosca # mqtt broker. could be running on another machine
while true ; do node bin/opc2websocket.js ; done # loop because sometimes this crashes when the browser disconnects :-/
node bin/mqtt.js --opc localhost --mqtt localhost # or wherever these processes are actually running

# open in the browser
open public/simulator.html
```

# Real pixels
```
npm install
# each of these commands needs to run in a separate tmux pane or whatever:
mosca # mqtt broker. could be running on another machine
node bin/mqtt.js --fps 5 --mqtt localhost
```
