const {merge} = require('webpack-merge');

const commonConfig = require('./webpack.common.config');

const developmentConfig = {
    mode: 'development',
    target: "web",
    devServer: { port: 4000, hot: true, open: true },
}

module.exports = merge(commonConfig, developmentConfig);