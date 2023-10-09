const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
    resolve: {
        extensions: ['.js', '.jsx', '.json']
    },
    module: {
        rules: [
            {
                test: /\.(css)$/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: "babel-loader",
                        options: {
                            presets: ['@babel/preset-react', '@babel/preset-env']
                        }
                    }
                ]
            },
            {
                test: /\.svg/,
                use: ['@svgr/webpack'],
            },
        ]
    },
    optimization: {
        minimizer: [new TerserPlugin({extractComments: false})],
    }
}
