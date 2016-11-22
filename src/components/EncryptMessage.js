import React, { Component, PropTypes } from 'react';
import { css, StyleSheet } from 'aphrodite';
import { inject, observer, PropTypes as MobxPropTypes } from 'mobx-react';
import { colours } from 'utils/constants';

const openpgp = require('openpgp');
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
});

@inject('appStore')
@observer
export default class EncryptMessage extends Component {

  static propTypes = {
    appStore: MobxPropTypes.objectOrObservableObject,
    params: PropTypes.shape({
      id: PropTypes.id,
    }),
  }

  state = {
    message: '',
    encrypted: false,
    sign: false,
  }

  componentDidMount() {
    this.user = this.props.appStore.friends
      .filter(friend => friend.id === this.props.params.id)[0];
  }

  handleSubmit = (e) => {
    openpgp.encrypt({
      data: this.state.message,
      publicKeys: openpgp.key.readArmored(this.user.publicKey).keys,
      privateKeys: this.state.sign && openpgp.key.readArmored(this.props.appStore.privateKey).keys,
    }).then(ciphertext => (
      this.setState({
        message: ciphertext.data,
        encrypted: true,
        sign: false,
      })
    ));
    e.preventDefault();
  }

  handleInputChange = (e) => {
    this.setState({
      message: e.target.value,
    });
  }

  handleCheckboxChange = (e) => {
    this.setState({
      sign: e.target.checked,
    });
  }

  copyReset = () => {
    clipboard.writeText(this.state.message);
    this.setState({
      message: '',
      encrypted: false,
    });
  }

  render() {
    const button = this.state.encrypted ? (
      <a onClick={this.copyReset} className={css(componentStyles.button)}>
        Copy to clipboard and clear
      </a>
    ) : (
      <a onClick={this.handleSubmit} className={css(componentStyles.button)}>Encrypt Message</a>
    );
    return (
      <form className={css(componentStyles.form)}>
        <div className={css(componentStyles.inputWrapper)}>
          <textarea
            className={css(componentStyles.input)}
            placeholder="Compose message here..."
            onChange={this.handleInputChange}
            value={this.state.message}
          />
          <div className={css(componentStyles.signWrapper)}>
            <input
              className={css(componentStyles.checkbox)}
              type="checkbox"
              onChange={this.handleCheckboxChange}
            />
            <span>Sign Message?</span>
          </div>
        </div>
        {button}
      </form>
    );
  }

}
