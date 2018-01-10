import React, { Component, PropTypes } from 'react';
import { css, StyleSheet } from 'aphrodite';
import { Link } from 'react-router';
import { colours } from 'utils/constants';
import { remote } from 'electron';

const { dialog } = remote;

const componentStyles = StyleSheet.create({
  friend: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    padding: 15,
    borderBottom: `1px solid ${colours.white}`,
    textDecoration: 'none',
    cursor: 'pointer',
    color: colours.midnightBlue,
  },
  friendActive: {
    backgroundColor: colours.midnightBlue,
    color: colours.clouds,
  },
  name: {
    fontSize: 14,
    fontWeight: 600,
    width: '93%',
  },
  delete: {
    width: '7%',
  },
  email: {
    fontSize: 10,
    width: '100%',
  },
});

export default class Friend extends Component {

  static propTypes = {
    onRemove: PropTypes.func,
    friend: PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      email: PropTypes.string,
    }),
  }

  handleDeleteClick = (e) => {
    const { friend, onRemove } = this.props;
    const { id, name, email } = friend;
    const choice = dialog.showMessageBox({
      type: 'question',
      buttons: ['Yes', 'No'],
      defaultId: 1,
      title: 'Confirm',
      message: `Are you sure you wish to delete the key for "${name} <${email}>"?`,
    });
    if (choice === 0) {
      onRemove(id);
    }
    e.preventDefault();
  }

  render() {
    const { friend } = this.props;
    return (
      <Link
        className={css(componentStyles.friend)}
        activeClassName={css(componentStyles.friendActive)}
        to={`/dashboard/encrypt/${friend.id}`}
      >
        <span className={css(componentStyles.name)}>{friend.name}</span>
        <span onClick={this.handleDeleteClick} className={css(componentStyles.delete)}>x</span>
        <span className={css(componentStyles.email)}>{friend.email}</span>
      </Link>
    );
  }

}
