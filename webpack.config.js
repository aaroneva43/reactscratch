
const webpack = require('webpack');
const htmlWebpackPlugin = require('html-webpack-plugin');
const extractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: __dirname + "/app/index.js", 
    output: {
        path: __dirname + "/build",
        filename: "bundle-[hash].js",
        publicPath: '/'
    },
    devtool: 'sourcemap',
    devServer: {
        contentBase: "./public", //本地服务器所加载的页面所在的目录
        historyApiFallback: true, //不跳转
        inline: true,
        hot: true,
        // compress: true
    },
    module: {
        rules: [{
            test: /(\.jsx|\.js)$/,
            use: {
                loader: "react-hot-loader"
            },
            exclude: /node_modules/
        }, {
            test: /(\.jsx|\.js)$/,
            use: {
                loader: "babel-loader"
            },
            exclude: /node_modules/
        }, {
            test: /\.css$/,
            use: extractTextPlugin.extract({
                fallback: "style-loader",
                use: [{
                    loader: "css-loader"
                }],
            })
        }

        ]
    },
    plugins: [
        new webpack.BannerPlugin('All Rights Reserved'),
        new htmlWebpackPlugin({
            template: __dirname + "/app/index.tpl.html" //new 一个这个插件的实例，并传入相关的参数
        }),
        new webpack.optimize.OccurrenceOrderPlugin(),
        // new webpack.optimize.UglifyJsPlugin(),
        new extractTextPlugin("style.css")

    ],
}