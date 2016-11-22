import React, { Component, PropTypes } from 'react';
import { observer, inject } from 'mobx-react';
import FriendsList from 'components/FriendsList';
import { css, StyleSheet } from 'aphrodite';
import { colours } from 'utils/constants';

const componentStyles = StyleSheet.create({
  dashboard: {
    display: 'flex',
    width: '100%',
    height: '100%',
  },
  content: {
    flexGrow: 1,
    backgroundColor: colours.white,
  },
});

@inject('appStore')
@observer
export default class Dashboard extends Component {

  static propTypes = {
    children: PropTypes.element.isRequired,
  }

  render() {
    return (
      <div className={css(componentStyles.dashboard)}>
        <div>
          <FriendsList />
        </div>
        <div className={css(componentStyles.content)}>
          {this.props.children}
        </div>
      </div>
    );
  }

}
