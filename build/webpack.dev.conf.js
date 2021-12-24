'use strict';
const baseWebpackConfig = require('./webpack.base.conf');
const { merge } = require('webpack-merge');
const config = require('../config');
const env = require('../config/dev.env');
const utils = require('./utils');
const portfinder = require('portfinder');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');

const webpackConfig = merge(baseWebpackConfig, {
  mode: env.NODE_ENV,
  devServer: {
    hot: true,
    compress: true,
    host: config.dev.host,
    port: config.dev.port,
    open: config.dev.autoOpenBrowser,
    proxy: config.dev.proxy
  }
});

module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = process.env.PORT || config.dev.port;
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err);
    } else {
      // publish the new Port, necessary for e2e tests
      process.env.PORT = port;
      // add port to devServer config
      webpackConfig.devServer.port = port;

      // Add FriendlyErrorsPlugin
      webpackConfig.plugins.push(
        new FriendlyErrorsPlugin({
          compilationSuccessInfo: {
            messages: ['服务已开启']
          },
          onErrors: config.dev.notifyOnErrors ? utils.createNotifierCallback() : undefined
        })
      );
      resolve(webpackConfig);
    }
  });
});
