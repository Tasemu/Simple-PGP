import React, { Component } from 'react';
import { observer, inject, PropTypes as MobxPropTypes } from 'mobx-react';
import { Link } from 'react-router';
import { css, StyleSheet } from 'aphrodite';
import { colours } from 'utils/constants';

const componentStyles = StyleSheet.create({
  component: {
    display: 'flex',
    flexWrap: 'wrap',
    padding: 0,
    margin: 0,
    height: 0,
  },
  li: {
    listStyleType: 'none',
    width: '100%',
    borderTop: `1px solid ${colours.clouds}`,
  },
  addFriend: {
    padding: 15,
    textAlign: 'center',
    display: 'block',
    cursor: 'pointer',
    textTransform: 'uppercase',
    backgroundColor: colours.darkBlue,
    color: colours.midnightBlue,
    textDecoration: 'none',
    fontSize: 14,
  },
  menu: {
    backgroundColor: colours.midnightBlue,
    color: colours.clouds,
  },
  menuOpen: {
    height: '100%',
  },
});

@inject('appStore')
@observer
export default class Menu extends Component {

  static propTypes = {
    appStore: MobxPropTypes.objectOrObservableObject.isRequired,
  }

  state = {
    menuOpen: false,
  }

  toggleMenu = () => {
    this.setState({
      menuOpen: !this.state.menuOpen,
    });
  }

  render() {
    const { uiMode } = this.props.appStore;
    const { addFriend, component } = componentStyles;
    const addFriendButton = uiMode === 'addFriend' ? (
      <Link to="/dashboard" className={css(addFriend)}>- Cancel</Link>
    ) : (
      <Link to="/dashboard/addFriend" className={css(addFriend)}>+ Add Friend</Link>
    );

    return (
      <div>
        <a
          className={css(
            componentStyles.addFriend,
            componentStyles.menu,
          )}
          onClick={this.toggleMenu}
        >Menu</a>
        <ul
          className={css(
            component,
            this.state.menuOpen && componentStyles.menuOpen,
          )}
        >
          <li className={css(componentStyles.li, componentStyles.fullButton)}>{addFriendButton}</li>
          <li className={css(componentStyles.li)}>
            <Link to="/dashboard/decrypt" className={css(addFriend)}>Decrypt</Link>
          </li>
          <li className={css(componentStyles.li)}>
            <Link className={css(addFriend)} to="/dashboard/getPublicKey">Copy Public Key</Link>
          </li>
          <li className={css(componentStyles.li)}>
            <Link to="/dashboard/exportPrivateKey" className={css(componentStyles.addFriend)}>Export Private Key</Link>
          </li>
        </ul>
      </div>
    );
  }

}
