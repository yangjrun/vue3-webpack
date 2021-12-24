'use strict';
const baseWebpackConfig = require('./webpack.base.conf');
const { merge } = require('webpack-merge');

const env = require('../config/prod.env');

const webpackConfig = merge(baseWebpackConfig, {
  mode: env.NODE_ENV
});

module.exports = webpackConfig;
