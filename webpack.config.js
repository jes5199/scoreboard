const path = require('path');

module.exports = {
    entry: './src/ConsoleDriver.js',
    target: 'node',
    output: {
        path: path.resolve(__dirname, 'bin'),
        filename: 'tty.js',
    },
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader'
        }]
    },
    node: {
    }
}
