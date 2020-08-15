const path = require('path');
const htmlWebpackPlugin = require("html-webpack-plugin");
const miniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    mode: "none",
    entry: "./src/index.js",
    output: {
        path: __dirname + '/dist',
        filename: "bundle.js"
    },
    devtool: 'cheap-module-eval-source-map',
    devServer: {
        contentBase: path.join(__dirname, 'dist')
    },
    module: {
        rules: [
            //*************** html loader ******************//
            {
                test: /\.html$/,
                use: [{
                    loader: 'html-loader'
                }]
            },
            //*************** css loader ******************//
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: miniCssExtractPlugin.loader,
                        options: {
                            publicPath: 'style/'
                        }
                    },
                    // "style-loader",
                    "css-loader",
                    "sass-loader",
                ]
            },
            //*************** js loader ******************//
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [
                            "@babel/preset-env",
                        ]
                    }
                }
            },
            //*************** image loader ******************//
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            outputPath: 'img/',    // where the fonts will go
                            publicPath: 'img'       // override the default path
                        }
                    }
                ]
            },
            //*************** file loader ******************//
            {
                test: /.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'fonts/',    // where the fonts will go
                        publicPath: 'fonts'       // override the default path
                    }
                }]
            }
        ]
    },
    plugins: [
        new htmlWebpackPlugin({
            template: "./src/index.html",
            filename: "./index.html"
        }),
        new miniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css'
        })
    ]
};