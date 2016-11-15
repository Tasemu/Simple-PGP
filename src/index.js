import 'babel-polyfill'; // generators
import React from 'react';
import { render as renderReact } from 'react-dom';
var App = require('./components/App').default;

const render = (Component) => {
  renderReact(<Component />, document.getElementById('root'));
};

render(App);

if (module.hot) {
  var newApp = require('./components/App').default;
  module.hot.accept('./components/App', function() {
    render(newApp);
  });
}
