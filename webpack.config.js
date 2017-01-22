'use strict';

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path              = require('path');

module.exports = {
  context: __dirname,
  entry:   {
    entrypoint: './src/entrypoint.js'
  },
  output:  {
    path:     path.join(__dirname, 'dist'),
    filename: '[name].js'
  },
  module:  {
    loaders: [
      {
        test:    /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader:  'babel-loader',
        query:   {
          presets: ['es2015']
        }
      },
      {
        test:   /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/,
        loader: 'file'
      },
      {
        test:    /\.scss|\.css/,
        loader: ExtractTextPlugin.extract("style-loader", "css-loader", "sass-loader")
      },
      {
        test:   /\.html$/,
        loader: 'raw-loader'
      }
    ]
  },
  resolve: {},
  plugins: [
    new CopyWebpackPlugin([

      {
        from: path.join(__dirname, 'src', 'index.html'),
        to:   path.join(__dirname, 'dist', 'index.html')
      },
      {
        from: path.join(__dirname, 'assets'),
        to:   path.join(__dirname, 'dist')
      },
    ]),
    new ExtractTextPlugin('[name].css')
  ]
};