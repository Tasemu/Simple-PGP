import React, { Component, PropTypes } from 'react';
import { css, StyleSheet } from 'aphrodite';
import { colours } from 'utils/constants';

const componentStyles = StyleSheet.create({
  friend: {
    padding: 15,
    cursor: 'pointer',
    borderBottom: `1px solid ${colours.white}`,
    color: colours.midnightBlue,
    display: 'flex',
    alignItems: 'center',
  },
  name: {
    fontSize: 14,
    fontWeight: 600,
    flexGrow: 1,
  },
  email: {
    fontSize: 10,
  },
});

export default class Friend extends Component {

  static propTypes = {
    friend: PropTypes.shape({
      name: PropTypes.string,
      email: PropTypes.string,
    }),
  }

  render() {
    const { friend } = this.props;
    return (
      <li className={css(componentStyles.friend)}>
        <span className={css(componentStyles.name)}>{friend.name}</span>
        <span className={css(componentStyles.email)}>{friend.email}</span>
      </li>
    );
  }

}
