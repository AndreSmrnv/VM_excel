const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
//const CopyPlugin = require("copy-webpack-plugin")
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");


module.exports = {
    context: path.resolve(__dirname, 'src'),
    entry: {
        main:  [
            'core-js/stable',
            'regenerator-runtime/runtime',
            './index.js'
        ],
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.js',
        clean: true
    },
    resolve: {
        extensions: ['.js', '.ts', 'jsx', 'tsx'],
        alias: {
            '@': path.resolve(__dirname, 'src'),
            '@core': path.resolve(__dirname, 'src', 'core'),
        }
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html'
        }),
        new FaviconsWebpackPlugin('./favicon_excel.png'),
        new MiniCssExtractPlugin({
            filename: '[name].bundle.css'
        })
        // new CopyPlugin({
        //     patterns: [
        //         {
        //             from: path.resolve(__dirname, 'src', 'favicon.ico'),
        //             to: path.resolve(__dirname, 'dist')
        //         },
        //     ],
        // })

    ],
    module: {
        rules: [
            {
                test: /\.less$/i,
                use: [
                    // compiles Less to CSS
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "less-loader",
                ],
            },
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ],
    },
}