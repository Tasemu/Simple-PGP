import React, { Component } from 'react';
import { css, StyleSheet } from 'aphrodite';
import { inject, observer, PropTypes as MobxPropTypes } from 'mobx-react';
import { colours } from 'utils/constants';

const { clipboard } = require('electron');

const componentStyles = StyleSheet.create({
  form: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  inputWrapper: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  input: {
    outline: 'none',
    fontSize: 14,
    border: 'none',
    background: colours.white,
    padding: 15,
    color: colours.black,
    flexGrow: 1,
  },
  button: {
    backgroundColor: colours.midnightBlue,
    color: colours.clouds,
    padding: 15,
    textAlign: 'center',
    cursor: 'pointer',
    textTransform: 'uppercase',
  },
  signWrapper: {
    padding: 15,
    display: 'flex',
    alignItems: 'center',
  },
  checkbox: {
    marginRight: 5,
  },
  passphrase: {
    outline: 'none',
    border: 'none',
    borderBottom: `1px solid ${colours.midnightBlue}`,
    margin: 15,
    marginBottom: 0,
    paddingBottom: 10,
  },
  checkboxSpan: {
    fontSize: 14,
    textTransform: 'uppercase',
  },
});

@inject('appStore')
@observer
export default class EncryptMessage extends Component {

  static propTypes = {
    appStore: MobxPropTypes.objectOrObservableObject,
  }

  state = {
    copied: false,
  }

  copyReset = () => {
    clipboard.writeText(this.props.appStore.publicKey);
    this.setState({ copied: true });
    setTimeout(() => {
      this.setState({ copied: false });
    }, 500);
  }

  render() {
    return (
      <form className={css(componentStyles.form)}>
        <div className={css(componentStyles.inputWrapper)}>
          <textarea
            className={css(componentStyles.input)}
            value={this.props.appStore.publicKey}
            readOnly
          />
        </div>
        <a onClick={this.copyReset} className={css(componentStyles.button)}>
          { !this.state.copied ? 'Copy to clipboard' : 'Copied!' }
        </a>
      </form>
    );
  }

}
