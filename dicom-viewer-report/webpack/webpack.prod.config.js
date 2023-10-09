const webpack = require('webpack');
const path = require('path');
const {merge} = require('webpack-merge');

const commonConfig = require('./webpack.common.config');

const productionConfig = {
    mode: 'production',
    entry: [path.resolve(__dirname, '../src/Report')],
    output: {
        path: path.resolve(__dirname, '../build'),
        filename: 'index.js',
        libraryTarget: 'umd'
    },
    externals: [
        {
            react: {
                root: 'React',
                commonjs2: 'react',
                commonjs: 'react',
                amd: 'react'
            },
            'react-dom': {
                root: 'ReactDOM',
                commonjs2: 'react-dom',
                commonjs: 'react-dom',
                amd: 'react-dom'
            }
        }
    ],
    plugins: [
        new webpack.optimize.LimitChunkCountPlugin({
            maxChunks: 1
        })
    ]
}

module.exports = merge(commonConfig, productionConfig);