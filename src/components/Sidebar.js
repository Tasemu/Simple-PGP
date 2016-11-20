import React, { Component, PropTypes } from 'react';
import { css, StyleSheet } from 'aphrodite';
import { colours } from 'constants.js';
import { observer, inject } from 'mobx-react';

const componentStyles = StyleSheet.create({
  component: {
    backgroundColor: colours.midnightBlue,
  },
  menu: {
    display: 'flex',
    flexDirection: 'column',
    listStyleType: 'none',
    margin: 0,
    padding: 0
  },
  menuButton: {
    padding: '10px 15px',
    borderBottom: `1px solid ${colours.clouds}`,
    color: colours.clouds,
    cursor: 'pointer'
  }
});

@inject('appStore')
@observer
export default class Sidebar extends Component {

  static propTypes = {
    store: PropTypes.object
  }

  render () {
    const { appStore: { loggedIn } } = this.props.store;

    return loggedIn ? (
      <aside className={css(componentStyles.component)}>
        <ul className={css(componentStyles.menu)}>
          <li className={css(componentStyles.menuButton)}>
            <a>Select Profile</a>
          </li>
          <li className={css(componentStyles.menuButton)}>
            <a>Decrypt</a>
          </li>
          <li className={css(componentStyles.menuButton)}>
            <a>Sign</a>
          </li>
          <li className={css(componentStyles.menuButton)}>
            <a>Verify</a>
          </li>
        </ul>
      </aside>
    ) : null;
  }

}
