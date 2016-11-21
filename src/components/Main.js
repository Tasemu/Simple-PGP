import React, { Component, PropTypes } from 'react';
import { observer, inject } from 'mobx-react';

@inject('appStore')
@observer
export default class Main extends Component {

  render () {
    return this.props.children;
  }

}
