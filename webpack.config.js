const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: {
    bundle: [
      './common/app.js'
    ],
  },
  output: {
    path: path.resolve(__dirname, 'output'),
    filename: '[name].js',
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: [
          path.resolve(__dirname, 'node_modules/')
        ]
      },
    ],
  },
  mode: 'development',
  devtool: 'cheap-module-source-map',
};
