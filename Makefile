tty : bin/tty.js
	node bin/tty.js

websocket:
	node bin/opc2websocket.js

bin/tty.js : src/*.js src/patterns/*.js
	./node_modules/.bin/webpack --config config/tty.webpack.config.js
