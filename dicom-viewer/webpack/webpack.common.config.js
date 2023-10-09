const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
    resolve: {
        extensions: ['.js', '.jsx', '.json'],
        fallback: {stream: require.resolve("stream-browserify")},
    },
    module: {
        rules: [
            {
                test: /\.(css)$/,
                use: [
                    { loader: "style-loader" },
                    { loader: "css-loader", options: { modules: true } }
                ],
                exclude: /node_modules/
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
            }
        ]
    },
    optimization: {
        minimizer: [new TerserPlugin({extractComments: false})],
    }
}
