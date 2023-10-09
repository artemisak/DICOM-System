const webpack = require('webpack');
const path = require('path');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const {merge} = require('webpack-merge');

const {HotModuleReplacementPlugin, ProvidePlugin} = webpack;
const commonConfig = require('./webpack.common.config');

const developmentConfig = {
    mode: 'development',
    target: "web",
    entry: [path.resolve(__dirname, '../src/index.jsx')],
    output: {
        path: path.resolve(__dirname, '../build'),
        filename: "index.min.js",
    },
    devServer: { port: 5000, hot: true, open: true },
    plugins: [
        new HTMLWebpackPlugin({template: path.resolve(__dirname, '../public/index.html')}),
        new ProvidePlugin({React: 'react', Buffer: ["buffer", "Buffer"]}),
        new HotModuleReplacementPlugin(),
        new CleanWebpackPlugin(),
    ],
}

module.exports = merge(commonConfig, developmentConfig);