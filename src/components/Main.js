import React, { Component, PropTypes } from 'react';
import { observer, inject } from 'mobx-react';
import { css, StyleSheet } from 'aphrodite';

const componentStyles = StyleSheet.create({
  main: {
    width: '100%',
    height: '100%',
    display: 'flex',
  },
});

@inject('appStore')
@observer
export default class Main extends Component {

  static propTypes = {
    children: PropTypes.element,
  }

  render() {
    return (
      <div className={css(componentStyles.main)}>
        {this.props.children}
      </div>
    );
  }

}
