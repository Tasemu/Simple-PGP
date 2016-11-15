import React, { Component, PropTypes } from 'react';
import { observer, Provider } from 'mobx-react';
import store from 'stores/appStore';
import Dashboard from 'components/Dashboard';

@observer
export default class App extends Component {

  render () {
    return (
      <Provider store={store}>
        <Dashboard />
      </Provider>
    );
  }

}
