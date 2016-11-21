import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';

@inject('appStore')
@observer
export default class Dashboard extends Component {

  render() {
    return (
      <div>
        test
      </div>
    );
  }

}
