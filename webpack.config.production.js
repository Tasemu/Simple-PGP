const path = require('path');

const config = {
  entry: [
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
  target: 'electron',
};

module.exports = config;
