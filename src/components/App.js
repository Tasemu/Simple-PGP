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
import GetPublicKey from 'components/GetPublicKey';
import Decrypt from 'components/Decrypt';
import Import from 'components/Import';
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
    <Route path="import" component={Import} />
    <Route path="dashboard" component={Dashboard} onEnter={checkAuth}>
      <IndexRoute component={Info} onEnter={() => setUiMode('default')} />
      <Route path="addfriend" component={AddFriendForm} onEnter={() => setUiMode('addFriend')} />
      <Route path="encrypt/:id" component={EncryptMessage} onEnter={() => setUiMode('encrypt')} />
      <Route path="getPublicKey" component={GetPublicKey} onEnter={() => setUiMode('getPublicKey')} />
      <Route path="decrypt" component={Decrypt} onEnter={() => setUiMode('decrypt')} />
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
