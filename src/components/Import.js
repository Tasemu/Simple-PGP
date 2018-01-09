import React, { Component, PropTypes } from 'react';
import { css, StyleSheet } from 'aphrodite';
import { colours } from 'utils/constants';
import { observer, inject, PropTypes as MobxPropTypes } from 'mobx-react';

const openpgp = require('openpgp');

const styles = StyleSheet.create({
  component: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  controls: {
    backgroundColor: colours.white,
    padding: 15,
    borderRadius: 2,
    display: 'flex',
    flexDirection: 'column',
    width: 300,
  },
  input: {
    outline: 'none',
    fontSize: 14,
    border: 'none',
    background: colours.white,
    padding: 15,
    marginBottom: 15,
    color: colours.black,
    flexGrow: 1,
  },
  button: {
    display: 'block',
    backgroundColor: colours.midnightBlue,
    color: colours.clouds,
    padding: 15,
    borderRadius: 2,
    textAlign: 'center',
    cursor: 'pointer',
    textDecoration: 'none',
  },
});

@inject('appStore')
@observer
export default class Import extends Component {

  static propTypes = {
    appStore: MobxPropTypes.objectOrObservableObject.isRequired,
  }

  static contextTypes = {
    router: PropTypes.object.isRequired,
  }

  state = {
    privateKey: '',
  }

  handlePrivateKeyChange = (e) => {
    this.setState({
      privateKey: e.target.value,
    });
  }

  importPrivateKey = () => {
    const key = openpgp.key.readArmored(this.state.privateKey);
    const userStr = key.keys[0].users[0].userId.userid;
    const email = userStr.substring(userStr.lastIndexOf('<') + 1, userStr.lastIndexOf('>'));
    const name = userStr.substring(0, userStr.lastIndexOf(' '));
    const publicKeyArmored = key.keys[0].toPublic().armor();

    this.props.appStore.importKey(name, email, publicKeyArmored, this.state.privateKey);
    this.context.router.push('/dashboard');
  }

  render() {
    return (
      <div className={css(styles.component)}>
        <div className={css(styles.controls)}>
          <textarea
            className={css(styles.input)}
            placeholder="Paste Private Key Here..."
            rows="15"
            value={this.state.privateKey}
            onChange={this.handlePrivateKeyChange}
          />
          <a onClick={this.importPrivateKey} className={css(styles.button)}>Import Private Key</a>
        </div>
      </div>
    );
  }

}
