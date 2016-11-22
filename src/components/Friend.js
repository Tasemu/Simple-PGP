import React, { Component, PropTypes } from 'react';
import { css, StyleSheet } from 'aphrodite';
import { Link } from 'react-router';
import { colours } from 'utils/constants';

const componentStyles = StyleSheet.create({
  friend: {
    display: 'flex',
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
      <Link
        className={css(componentStyles.friend)}
        activeClassName={css(componentStyles.friendActive)}
        to={`/dashboard/encrypt/${friend.id}`}
      >
        <span className={css(componentStyles.name)}>{friend.name}</span>
        <span className={css(componentStyles.email)}>{friend.email}</span>
      </Link>
    );
  }

}
