const webpack = require('webpack');
const path = require('path');

const config = {
  entry: [
    'webpack-hot-middleware/client?reload=true&path=http://localhost:9000/__webpack_hmr',
    'react-hot-loader/patch',
    './src/index',
  ],
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loaders: ['babel-loader'],
        exclude: /node_modules/,
      }, {
        test: /\.png|\.svg$/,
        loaders: ['file-loader'],
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader',
      },
    ],
  },
  output: {
    path: `${__dirname}/dist`,
    publicPath: 'http://localhost:9000/dist/',
    filename: 'bundle.js',
  },
  resolve: {
    root: path.resolve('./src'),
    extensions: ['', '.js', '.jsx'],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
  target: 'electron',
};

module.exports = config;
