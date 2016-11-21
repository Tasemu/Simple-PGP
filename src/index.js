import 'babel-polyfill'; // generators
import React from 'react';
import { render as renderReact } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import App from './components/App';

require('normalize.css');

renderReact(
  <AppContainer>
    <App />
  </AppContainer>
  , document.getElementById('root')); // eslint-disable-line

if (module.hot) {
  module.hot.accept('./components/App', () => {
    var NewApp = require('./components/App').default; // eslint-disable-line
    renderReact(
      <AppContainer>
        <NewApp />
      </AppContainer>
    , document.getElementById('root')) // eslint-disable-line
  });
}
