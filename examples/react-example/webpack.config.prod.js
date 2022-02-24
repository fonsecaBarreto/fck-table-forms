const path = require('path');
const {merge} = require('webpack-merge');
const config = require('./webpack.config');

module.exports = merge(config, {
    mode: 'production',
    devtool: "source-map",
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: './',
    },
})




