/* eslint-disable */
const webpack = require('webpack');

const config = {
  devtool: 'source-map',
  noInfo: true,
  entry: './src/index.js',
  output: {
    path: './dist',
    filename: 'bundle.js',
    publicPath: '/',
  },

  devServer: {
    inline: true,
    port: 8080,
    contentBase: './dist',
  },

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['es2015', 'react'],
        },
      },
      {
        test: /\.css$/,
        loaders: ['style', 'css'],

      }
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
      },
    }),
    new webpack.NoErrorsPlugin(),
  ],
};

module.exports = config;
