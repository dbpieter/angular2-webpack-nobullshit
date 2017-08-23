// vendor-bundles.webpack.config.js
var webpack = require('webpack')
var dependencies = require('./package.json').dependencies

module.exports = {
    entry: {
        vendor: Object.keys(dependencies)
    },

    output: {
        filename: '[name].bundle.js',
        path: 'dst/',

        // The name of the global variable which the library's
        // require() function will be assigned to
        library: '[name]_lib',
    },

    plugins: [
        new webpack.DllPlugin({
            // The path to the manifest file which maps between
            // modules included in a bundle and the internal IDs
            // within that bundle
            path: 'dst/[name]-manifest.json',
            // The name of the global variable which the library's
            // require function has been assigned to. This must match the
            // output.library option above
            name: '[name]_lib'
        }),
    ],
}