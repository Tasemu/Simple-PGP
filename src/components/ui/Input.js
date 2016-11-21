import React, { Component, PropTypes } from 'react';
import { css, StyleSheet } from 'aphrodite';
import { colours } from 'constants.js';

const componentStyles = StyleSheet.create({
  input: {
    background: colours.clouds,
    border: 'none',
    borderBottom: `1px solid ${colours.midnightBlue}`,
    padding: 5,
    fontSize: 18,
    color: colours.midnightBlue,
    outline: 'none',
    margin: 5,
    marginBottom: 15,
    display: 'block',
    '::-webkit-input-placeholder': {
      color: colours.midnightBlue
    }
  }
});

export default class Input extends Component {

  render () {
    return (
      <input {...this.props} className={css(componentStyles.input)} />
    );
  }

}
