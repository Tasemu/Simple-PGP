import 'babel-polyfill'; // generators
import React from 'react';
import { render as renderReact } from 'react-dom';
import App from './components/App';
import { AppContainer } from 'react-hot-loader';

renderReact(
  <AppContainer>
    <App />
  </AppContainer>
  , document.getElementById('root'));

if (module.hot) {
  module.hot.accept('./components/App', () => {
    var NewApp = require('./components/App').default;
    renderReact(
      <AppContainer>
        <NewApp />
      </AppContainer>
    , document.getElementById('root'))
  });
}
