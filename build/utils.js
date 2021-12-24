const glob = require('glob');
const path = require('path');
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const packageConfig = require('../package.json');

const resolve = dir => {
  return path.resolve(__dirname, '..', dir);
};

const ENTRIES_PATH = resolve('entries');
const HTML_TEMPLATE_PATH = resolve('index.html');

exports.createNotifierCallback = () => {
  const notifier = require('node-notifier');

  return (severity, errors) => {
    if (severity !== 'error') return;

    const error = errors[0];
    const filename = error.file && error.file.split('!').pop();

    notifier.notify({
      title: packageConfig.name,
      message: severity + ': ' + error.name,
      subtitle: filename || '',
      icon: path.join(__dirname, 'logo.png')
    });
  };
};

exports.entries = function () {
  const entryFiles = glob.sync(ENTRIES_PATH + '/*');
  const map = {};
  entryFiles.forEach(filePath => {
    const entryName = filePath.substring(filePath.lastIndexOf('/') + 1);
    map[entryName] = {
      import: filePath + '/main.ts',
      filename: entryName + '\\[name].[hash:7].js'
    };
  });
  return map;
};

// 多页面输出模版配置 HtmlWebpackPlugin
exports.entryHtmlPlugin = function () {
  const entryFiles = glob.sync(ENTRIES_PATH + '/*');
  const entryHtmlPluginArray = [];
  entryFiles.forEach(filePath => {
    const entryName = filePath.substring(filePath.lastIndexOf('/') + 1);
    let conf = {
      template: HTML_TEMPLATE_PATH,
      filename: entryName + '\\index.html',
      chunks: [entryName],
      inject: true
    };
    // production 生产模式下配置
    if (process.env.NODE_ENV === 'production') {
      conf = merge(conf, {
        chunks: ['manifest', 'vendor'],
        minify: {
          removeComments: true,
          collapseWhitespace: true,
          removeAttributeQuotes: true
        },
        chunksSortMode: 'auto'
      });
    }
    entryHtmlPluginArray.push(new HtmlWebpackPlugin(conf));
  });
  return entryHtmlPluginArray;
};

exports.entryAlias = function () {
  const entryFiles = glob.sync(ENTRIES_PATH + '/*');
  const alias = {};
  entryFiles.forEach(filePath => {
    const entryName = filePath.substring(filePath.lastIndexOf('/') + 1);
    alias['@' + entryName] = resolve('entries\\' + entryName);
  });
  return alias;
};
