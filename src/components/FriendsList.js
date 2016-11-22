import React, { Component } from 'react';
import { observer, inject, PropTypes } from 'mobx-react';
import { css, StyleSheet } from 'aphrodite';
import { Link } from 'react-router';
import { colours } from 'utils/constants';
import Friend from 'components/Friend';

const componentStyles = StyleSheet.create({
  friendsList: {
    width: 300,
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    borderRight: `1px solid ${colours.white}`,
  },
  list: {
    margin: 0,
    padding: 0,
    flexGrow: 1,
    overflowY: 'auto',
  },
  addFriend: {
    padding: 15,
    textAlign: 'center',
    display: 'block',
    cursor: 'pointer',
    textTransform: 'uppercase',
    backgroundColor: colours.midnightBlue,
    color: colours.clouds,
    textDecoration: 'none',
  },
});

@inject('appStore')
@observer
export default class FriendsList extends Component {

  static propTypes = {
    appStore: PropTypes.objectOrObservableObject.isRequired,
  }

  toggleFriendMode = () => {
    this.props.appStore.addFriendMode = !this.props.appStore.addFriendMode;
  }

  render() {
    const { friends, addFriendMode } = this.props.appStore;
    const friendComponents = friends.map(f => <Friend friend={f} key={f.email} />);
    const addFriendText = (
      <Link
        onClick={this.toggleFriendMode}
        to={addFriendMode ? '/dashboard' : '/dashboard/addFriend'}
        className={css(componentStyles.addFriend)}
      >{addFriendMode ? '- Cancel' : '+ Add Friend'}</Link>
    );

    return (
      <div className={css(componentStyles.friendsList)}>
        <ul className={css(componentStyles.list)}>
          {friendComponents}
        </ul>
        {addFriendText}
      </div>
    );
  }

}
