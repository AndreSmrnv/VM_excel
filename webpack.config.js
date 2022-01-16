const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
//const CopyPlugin = require("copy-webpack-plugin")
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')

module.exports = {
    context: path.resolve(__dirname, 'src'),
    entry: {
        main: './index.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.js'
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
        new FaviconsWebpackPlugin('./favicon_excel.png')
        // new CopyPlugin({
        //     patterns: [
        //         {
        //             from: path.resolve(__dirname, 'src', 'favicon.ico'),
        //             to: path.resolve(__dirname, 'dist')
        //         },
        //     ],
        // })

    ]
}