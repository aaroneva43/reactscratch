
const path = require('path')
const webpack = require('webpack');
const htmlWebpackPlugin = require('html-webpack-plugin');
const extractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: {
        app: [
            'webpack-dev-server/client?http://localhost:8080',
            // 为 webpack-dev-server 的环境打包代码
            // 然后连接到指定服务器域名与端口，可以换成本机ip

            'webpack/hot/only-dev-server',
            // 为热替换(HMR)打包好代码
            // only- 意味着只有成功更新运行代码才会执行热替换(HMR)
            './app/index.js']
    },
    output: {
        path: '/',
        filename: "bundle.js",
        publicPath: '/'
    },
    devtool: 'inline-source-map',

    devServer: {
        contentBase: './dist',
        historyApiFallback: true,
        hot: true
    },
    resolve: {
        extensions: [".jsx", ".json", ".js"]
    },
    module: {
        rules: [{
            test: /(\.jsx|\.js)$/,
            use: [{
                loader: "react-hot-loader/webpack"
            }, {
                loader: "babel-loader"
            }],
            exclude: /node_modules/
        }, {
            test: /\.css$/,
            use: extractTextPlugin.extract({
                fallback: "style-loader",
                use: [{
                    loader: "css-loader",
                    options: {
                        modules: true
                    }
                }, {
                    loader: "postcss-loader"
                }],
            })
        }

        ]
    },
    plugins: [
        new htmlWebpackPlugin({
            template: __dirname + "/app/index.tpl.html"
        }),
        // new webpack.optimize.OccurrenceOrderPlugin(),
        // new webpack.optimize.UglifyJsPlugin(),
        new extractTextPlugin("style.css"),
        new webpack.HotModuleReplacementPlugin()

    ],
}
