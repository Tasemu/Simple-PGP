const webpackTargetElectronRenderer = require('webpack-target-electron-renderer');
const dev = require('./webpack.config.development.js');
const prod = require('./webpack.config.production.js');

let config;

if (process.env.ENV === 'development') {
  config = dev;
  config.target = webpackTargetElectronRenderer(config);
} else {
  config = prod;
}

module.exports = config;
