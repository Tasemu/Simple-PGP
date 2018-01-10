import React, { Component, PropTypes } from 'react';
import { css, StyleSheet } from 'aphrodite';
import { inject, observer, PropTypes as MobxPropTypes } from 'mobx-react';
import { colours } from 'utils/constants';

const { remote } = require('electron');

const { dialog } = remote;

const componentStyles = StyleSheet.create({
  form: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  input: {
    flexGrow: 1,
    outline: 'none',
    border: 'none',
    background: colours.white,
    padding: 15,
    fontSize: 12,
    color: colours.black,
  },
  button: {
    backgroundColor: colours.midnightBlue,
    color: colours.clouds,
    padding: 15,
    textAlign: 'center',
    cursor: 'pointer',
    textTransform: 'uppercase',
    fontSize: 14,
  },
});

@inject('appStore')
@observer
export default class AddFriendForm extends Component {

  static propTypes = {
    appStore: MobxPropTypes.objectOrObservableObject,
  }

  static contextTypes = {
    router: PropTypes.object.isRequired,
  }

  state = {
    key: '',
  }

  handleSubmit = (e) => {
    try {
      this.props.appStore.addFriend(this.state.key);
      this.setState({
        key: '',
      });
      this.props.appStore.uiMode = 'default';
      this.context.router.push('/dashboard');
    } catch (err) {
      dialog.showErrorBox('Error', err.message);
    }
    e.preventDefault();
  }

  handleInputChange = (e) => {
    this.setState({
      key: e.target.value,
    });
  }

  render() {
    return (
      <form className={css(componentStyles.form)}>
        <textarea
          className={css(componentStyles.input)}
          placeholder="Paste Public Key Here..."
          onChange={this.handleInputChange}
          value={this.state.key}
        />
        <a onClick={this.handleSubmit} className={css(componentStyles.button)}>Submit Public Key</a>
      </form>
    );
  }

}
