'use strict';

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

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
        app: './src/main.ts',
    };

    var resolve = {
        modules: [
            path.join(__dirname, 'src'),
            'node_modules'
        ],
        extensions: ['.ts', '.js', '.json']
    };

    var output = {
        path: path.join(__dirname, 'dst'),
        filename: '[name].js'
    };

    var module = {
        rules: [{
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
        contentBase: './dst',
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
            minChunks: ({
                resource
            }) => {
                return resource && resource.indexOf('node_modules') >= 0;
            },
        }),

        new webpack.optimize.CommonsChunkPlugin({
            name: 'polyfills',
            minChunks: ({
                resource
            }) => {
                return resource && (resource.indexOf('zone.js') >= 0 || resource.indexOf('core-js') >= 0);
            },
        }),

        // // Generate a 'manifest' chunk to be inlined in the HTML template
        // new webpack.optimize.CommonsChunkPlugin('manifest'),

        new HtmlWebpackPlugin({
            template: 'index.ejs',
            inject: 'body',
        }),
        new webpack.ContextReplacementPlugin(
            /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
            __dirname
        )

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