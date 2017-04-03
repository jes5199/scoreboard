tty : bin/tty.js
	node bin/tty.js

bin/tty.js : src/ConsoleDriver.js src/Scoreboard.js
	./node_modules/.bin/webpack --config config/tty.webpack.config.js
