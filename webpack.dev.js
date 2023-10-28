const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    static: {
      directory: path.resolve(__dirname, './dist'),
    },
    client: {
      overlay: false,
      webSocketURL: {
        hostname: 'localhost',
      },
    },
    hot: false,
    port: 8084,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
});
