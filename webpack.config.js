'use strict';

var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var isExternal = function (module) {
    var userRequest = module.userRequest;

    if (typeof userRequest !== 'string') {
        return false;
    }

    return userRequest.indexOf('bower_components') >= 0 ||
        userRequest.indexOf('node_modules') >= 0 ||
        userRequest.indexOf('libraries') >= 0;
}

var config = function () {
    var entry = {
        app: './src/main.ts'
    };

    var resolve = {
        root: __dirname,
        extensions: ['', '.ts', '.js', '.json']
    };

    var output = {
        path: './dst/',
        filename: '[name].js'
    };

    var module = {
        preLoaders: [],
        loaders: [{
            test: /\.html$/,
            exclude: /node_modules/,
            loader: 'raw'
        }, {
            test: /\.scss$/,
            loader: 'style!css!postcss!sass'
        }, {
            test: /\.ts$/,
            exclude: /node_modules/,
            loader: 'ts-loader'
        }]
    };

    var devServer = {
        contentBase: './app',
        stats: {
            colors: true,
            modules: false,
            cached: false,
            chunk: false
        },
        historyApiFallback: true
    };

    var plugins = [
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: function (module) {
                return isExternal(module);
            }
        }),
        new HtmlWebpackPlugin({
            template: 'index.ejs',
            inject: 'body',
        })
    ];

    var devtool = 'source-map';

    return {
        devServer: devServer,
        entry: entry,
        output: output,
        module: module,
        plugins: plugins,
        resolve: resolve,
        devtool: devtool
    };
};


module.exports = config();