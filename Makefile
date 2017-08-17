tty : bin/tty.js
	node bin/tty.js

websocket:
	node bin/opc2websocket.js

bin/tty.js : src/*.js src/patterns/*.js src/patterns/fonts/*.js
	./node_modules/.bin/webpack --config config/tty.webpack.config.js

public/emulator.js : src/*.js src/patterns/*.js src/patterns/fonts/*.js
	./node_modules/.bin/webpack --config config/browser.webpack.config.js

bin/mqtt.js : src/*.js src/patterns/*.js src/patterns/fonts/*.js
	./node_modules/.bin/webpack --config config/mqtt.webpack.config.js

laptop: bin/mqtt.js
	node bin/opc2websocket.js & node bin/mqtt.js
