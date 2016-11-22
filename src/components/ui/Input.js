import React, { Component } from 'react';
import { css, StyleSheet } from 'aphrodite';
import { colours } from 'utils/constants';

const componentStyles = StyleSheet.create({
  input: {
    border: 'none',
    borderBottom: `1px solid ${colours.midnightBlue}`,
    color: colours.midnightBlue,
    outline: 'none',
    lineHeight: '26px',
    marginBottom: 15,
    display: 'block',
    // width: '100%',
    '::-webkit-input-placeholder': {
      color: colours.midnightBlue,
    },
  },
});

export default class Input extends Component {

  render() {
    return (
      <input {...this.props} className={css(componentStyles.input)} />
    );
  }

}
