const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
// const CopyPlugin = require("copy-webpack-plugin")
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = (env, args) => {
  const isProd = args.mode === 'production';

  const fileName = (isProd, ext) => isProd ?
      `[name].[contenthash].bundle.${ext}` :
      `[name].bundle.${ext}`;
  const fileNameMode = fileName.bind(null, isProd);

  const plugins = (isProd) => {
    const pluginsArr = [
      new HtmlWebpackPlugin({
        template: './index.html'
      }),
      new FaviconsWebpackPlugin('./favicon_excel.png'),
      new MiniCssExtractPlugin({
        filename: fileNameMode('css')
      })
      // new CopyPlugin({
      //     patterns: [
      //         {
      //             from: path.resolve(__dirname, 'src', 'favicon.ico'),
      //             to: path.resolve(__dirname, 'dist')
      //         },
      //     ],
      // })

    ];
    isProd && pluginsArr.push(new ESLintPlugin());
    return pluginsArr
  }
  const pluginsMode = plugins.bind(null, isProd);

  return {
    context: path.resolve(__dirname, 'src'),
    entry: {
      main: [
        'core-js/stable',
        'regenerator-runtime/runtime',
        './index.js'
      ],
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: fileNameMode('js'),
      clean: true
    },
    devServer: {
      port: 3003,
      open: true,
      hot: true,
      watchFiles: './',
    },
    resolve: {
      extensions: ['.js', '.ts', 'jsx', 'tsx'],
      alias: {
        '@': path.resolve(__dirname, 'src'),
        '@core': path.resolve(__dirname, 'src', 'core'),
      }
    },
    plugins: pluginsMode(),
    module: {
      rules: [
        {
          test: /\.less$/i,
          use: [
            // compiles Less to CSS
            MiniCssExtractPlugin.loader,
            'css-loader',
            'less-loader',
          ],
        },
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          }
        }
      ],
    },
  }
}
