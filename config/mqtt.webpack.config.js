const path = require('path');

module.exports = {
    entry: './src/MqttDriver.js',
    target: 'node',
    output: {
        path: path.resolve(__dirname, '../bin'),
        filename: 'mqtt.js',
    },
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: ['babel-loader']
        },{
            test: /\.js$/,
            loader: ['shebang-loader']
        }
        ]
    },
    node: {
    }
}
