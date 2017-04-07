const path = require('path');

module.exports = {
    entry: './src/BrowserDriver.js',
    output: {
        path: path.resolve(__dirname, '../public'),
        filename: 'emulator.js',
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
