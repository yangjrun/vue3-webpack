'use strict';
const path = require('path');
const utils = require('./utils');
const config = require('../config');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { VueLoaderPlugin } = require('vue-loader');

/**
 * 拼接字符串
 * @param {*} relativePath
 * @returns
 */
const resolve = relativePath => {
  return path.resolve(__dirname, '..', relativePath);
};

module.exports = {
  context: resolve(''),
  entry: utils.entries(),
  output: {
    path: config.build.assetsRoot,
    filename: '[name].[hash:7].js',
    publicPath: process.env.NODE_ENV === 'production' ? config.build.assetsPublicPath : config.dev.assetsPublicPath
  },
  module: {
    rules: [
      {
        test: /.vue$/,
        use: 'vue-loader'
      },
      {
        test: /\.ts$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              appendTsSuffixTo: [/.vue$/]
            }
          }
        ]
      },
      {
        test: /.tsx$/i,
        use: 'babel-loader'
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          process.env.NODE_ENV !== 'production' ? 'style-loader' : MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          }
        ],
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', 'vue'],
    alias: Object.assign(
      {
        '@': resolve('src')
      },
      utils.entryAlias()
    )
    // plugins: [new TsconfigPathsPlugin({ configFile: "" })]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css'
    })
  ].concat(utils.entryHtmlPlugin())
};
