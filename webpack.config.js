var debug = process.env.NODE_ENV !== "production";
var webpack = require('webpack');
var path = require('path');

var config = {

    dev: {
        devtool: 'cheap-module-eval-source-map',
        entry: [
            './src/js/app'
        ],
        output: {
            path: path.join(__dirname, 'public/js'),
            filename: 'bundle.js',
            publicPath: '/static/js/'
        },
        plugins: [
            new webpack.optimize.OccurrenceOrderPlugin(),
        ],
        module: {
            loaders: [
                {
                    test: /\.js$/,
                    loaders: ['babel'],
                    exclude:  /(node_modules|bower_components)/,
                    include: __dirname
                }
            ]
        }
    },

    production: {
        devtool: null,
        entry: [
            './src/js/app'
        ],
        output: {
            path: path.join(__dirname, 'public/js'),
            filename: 'bundle-[hash].min.js',
            publicPath: '/static/js/'
        },
        plugins: [
            new webpack.optimize.DedupePlugin(),
            new webpack.optimize.OccurenceOrderPlugin(),
            new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false })
        ],
        module: {
            loaders: [
                {
                    test: /\.js$/,
                    loaders: ['babel'],
                    exclude:  /(node_modules|bower_components)/,
                    include: __dirname
                }
            ]
        }
    }
};

module.exports = debug ? config.dev : config.production;