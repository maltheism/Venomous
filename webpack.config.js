'use strict';

const debug = true;
const path = require('path');
const webpack = require('webpack');
const externals = require('webpack-node-externals');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

function recursiveIssuer(m) {
    if (m.issuer) {
        return recursiveIssuer(m.issuer);
    } else if (m.name) {
        return m.name;
    } else {
        return false;
    }
}

const client = {
    entry: {
        app: [
            './public/lib/app/main.js',
            './public/lib/app/map/mapStyle.js',
            './public/lib/app/map/mapController.js',
            './public/lib/app/websocket/client.js',
        ]
    },
    output: {
        path: path.resolve(__dirname + '/public', 'dist'),
        filename: '[name].bundle.js',
        library: 'app',
        libraryTarget: 'umd'
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery',
            Popper: ['popper.js', 'default'],
        }),
        new webpack.DefinePlugin({
            PRODUCTION: JSON.stringify(true),
            VERSION: JSON.stringify('v1'),
            BROWSER_SUPPORTS_HTML5: true,
        })
    ],
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                cache: true,
                parallel: true,
                uglifyOptions: {
                    warnings: false,
                    mangle: !debug,
                    keep_fnames: debug,
                    compress: {
                        unused: !debug
                    },
                },
            })
        ]
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader?cacheDirectory',
                enforce: 'pre'
            }
        ]
    },
    devtool: debug ? 'inline-source-map' : false,
    mode: debug ? 'development' : 'production'
};

const styles = {
    entry: {
        app: [
            './public/stylesheets/fonts/style.css',
            './public/stylesheets/app/style.css',
            './public/stylesheets/app/map/style.css',
            './public/stylesheets/app/map/marker/style.css',
        ]
    },
    output: {
        path: path.resolve(__dirname + '/public', 'dist')
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                styles: {
                    name: 'app',
                    test: (m,c,entry = 'app') => m.constructor.name === 'CssModule' && recursiveIssuer(m) === entry,
                    chunks: 'all',
                    enforce: true
                }
            }
        }
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader'
                ]
            },
            {
                test: /\.woff($|\?)|\.woff2($|\?)|\.ttf($|\?)|\.eot($|\?)|\.svg($|\?)/,
                use: 'url-loader'
            }
        ]
    },
    resolve: {
        alias: {},
        modules: [],
        extensions: ['.css']
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].css',
        }),
    ],
    mode: 'production'
};

const server = {
    entry: './bin/www.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'loris-gland-webpack.bundle.js'
    },
    resolve: {
        extensions: ['*', '.js', '.json']
    },
    externals: [externals()],
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                cache: true,
                parallel: true,
                uglifyOptions: {
                    warnings: false,
                    mangle: !debug,
                    keep_fnames: debug,
                    compress: {
                        unused: !debug
                    },
                },
            })
        ]
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.json$/,
                loader: 'json'
            }
        ]
    },
    plugins: [

    ],
    mode: 'none',
    target: 'node'
};

module.exports = [client, styles, server];
