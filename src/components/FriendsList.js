import React, { Component } from 'react';
import { observer, inject, PropTypes as MobxPropTypes } from 'mobx-react';
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
    appStore: MobxPropTypes.objectOrObservableObject.isRequired,
  }

  toggleFriendMode = () => {
    const { uiMode } = this.props.appStore;
    this.props.appStore.uiMode = uiMode !== 'addFriend' ? 'addFriend' : 'default';
  }

  render() {
    const { friends, uiMode } = this.props.appStore;
    const friendComponents = friends.map(f => (
      <Friend key={f.id} friend={f} />
    ));
    const addFriendText = (
      <Link
        onClick={this.toggleFriendMode}
        to={uiMode === 'addFriend' ? '/dashboard' : '/dashboard/addFriend'}
        className={css(componentStyles.addFriend)}
      >{uiMode === 'addFriend' ? '- Cancel' : '+ Add Friend'}</Link>
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
