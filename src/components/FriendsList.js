import React, { Component } from 'react';
import { observer, inject, PropTypes as MobxPropTypes } from 'mobx-react';
import { css, StyleSheet } from 'aphrodite';
import { Link } from 'react-router';
import { colours } from 'utils/constants';
import Friend from 'components/Friend';
import Menu from 'components/ui/Menu';

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
});

@inject('appStore')
@observer
export default class FriendsList extends Component {

  static propTypes = {
    appStore: MobxPropTypes.objectOrObservableObject.isRequired,
  }

  removeFriend = (id) => {
    this.props.appStore.removeFriend(id);
  }

  render() {
    const { friends } = this.props.appStore;
    const friendComponents = friends.map(f => (
      <Friend key={f.id} friend={f} onRemove={this.removeFriend} />
    ));

    return (
      <div className={css(componentStyles.friendsList)}>
        <ul className={css(componentStyles.list)}>
          {friendComponents}
        </ul>
        <Menu />
      </div>
    );
  }

}
