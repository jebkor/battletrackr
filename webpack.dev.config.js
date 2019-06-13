const webpack = require('webpack')
const path = require('path')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.config')


module.exports = merge(baseConfig, {
    mode: 'development',
    output: {
        filename: '[name].js',
        pathinfo: false,
    },
    devtool: 'eval-source-map',
    optimization: {
        nodeEnv: 'development',
        minimize: false,
    },
})
