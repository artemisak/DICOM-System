const webpack = require('webpack');
const path = require('path');
const {merge} = require('webpack-merge');

const {ProvidePlugin} = webpack;

const commonConfig = require('./webpack.common.config');

const productionConfig = {
    mode: 'production',
    entry: [path.resolve(__dirname, '../src/components/DicomViewer.jsx')],
    output: {
        path: path.resolve(__dirname, '../build'),
        filename: 'index.js',
        libraryTarget: 'umd'
    },
    plugins: [new ProvidePlugin({React: 'react', Buffer: ["buffer", "Buffer"]})],
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
    ]
}

module.exports = merge(commonConfig, productionConfig);