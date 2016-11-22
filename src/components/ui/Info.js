import React, { Component } from 'react';
import { css, StyleSheet } from 'aphrodite';
import { colours } from 'utils/constants';

const componentStyles = StyleSheet.create({
  info: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    display: 'flex',
    alignItems: 'center',
  },
  heading: {
    margin: 0,
    padding: 30,
    textAlign: 'center',
    fontSize: 21,
    fontStyle: 'italic',
    color: colours.midnightBlue,
  },
});

export default class Info extends Component {

  render() {
    return (
      <div className={css(componentStyles.info)}>
        <h1 className={css(componentStyles.heading)}>
          Add friends by adding their public key using the sidebar.
          Encrypt messages by clicking a friends name.
        </h1>
      </div>
    );
  }

}
