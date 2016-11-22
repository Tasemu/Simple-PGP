import React, { Component } from 'react';
import { observer, Provider } from 'mobx-react';
import { css, StyleSheet } from 'aphrodite';
import { enableLogging } from 'mobx-logger';
import { Router, Route, hashHistory, IndexRedirect, IndexRoute } from 'react-router';
import appStore from 'stores/appStore';
import Dashboard from 'components/Dashboard';
import Login from 'components/Login';
import Main from 'components/Main';
import Info from 'components/ui/Info';
import AddFriendForm from 'components/AddFriendForm';
import EncryptMessage from 'components/EncryptMessage';
import { colours } from 'utils/constants';

enableLogging({
  action: true,
  reaction: true,
  transaction: true,
  compute: true,
});

const componentStyles = StyleSheet.create({
  component: {
    display: 'flex',
    height: '100%',
    backgroundColor: colours.clouds,
  },
});

const checkAuth = (nextState, replace) => {
  console.log('uiMode', 'default');
  appStore.uiMode = 'default';
  if (!appStore.loggedIn) {
    replace('/login');
  }
};

const setUiMode = (mode) => {
  console.log('uiMode', mode);
  appStore.uiMode = mode;
};

const routes = (
  <Route path="/" component={Main}>
    <IndexRedirect to="/dashboard" />
    <Route path="login" component={Login} />
    <Route path="dashboard" component={Dashboard} onEnter={checkAuth}>
      <IndexRoute component={Info} />
      <Route path="addfriend" component={AddFriendForm} onEnter={() => setUiMode('addFriend')} />
      <Route path="encrypt/:id" component={EncryptMessage} onEnter={() => setUiMode('encrypt')} />
    </Route>
  </Route>
);

@observer
export default class App extends Component {

  render() {
    return (
      <Provider appStore={appStore}>
        <div className={css(componentStyles.component)}>
          <Router history={hashHistory}>
            {routes}
          </Router>
        </div>
      </Provider>
    );
  }

}
