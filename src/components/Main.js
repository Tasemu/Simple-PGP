import React, { Component, PropTypes } from 'react';
import { observer, inject } from 'mobx-react';

@inject('appStore')
@observer
export default class Main extends Component {

  static propTypes = {
    children: PropTypes.element,
  }

  render() {
    return (
      <div style={{ height: '100%' }}>
        {this.props.children}
      </div>
    );
  }

}
