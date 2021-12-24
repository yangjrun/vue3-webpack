'use strict';
// Template version: 1.3.1
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path');

module.exports = {
  dev: {
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    host: 'localhost',
    port: 9000,
    autoOpenBrowser: false,
    errorOverlay: true,
    notifyOnErrors: true,
    devtool: 'cheap-module-eval-source-map',
    poll: false,
    proxy: {}
  },
  build: {
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/'
  }
};
