const {merge} = require('webpack-merge');

const commonConfig = require('./webpack.common.config');

const productionConfig = {
    mode: 'production'
}

module.exports = merge(commonConfig, productionConfig);