import React, { Component, PropTypes } from 'react';
import { observer, inject } from 'mobx-react';

@inject('store')
@observer
export default class Dashboard extends Component {

  render () {
    return (
      <h1>aaaa</h1>
    );
  }

}
