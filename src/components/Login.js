import React, { Component } from 'react';
import { Link } from 'react-router';
import { observer, inject } from 'mobx-react';

@inject('appStore')
@observer
export default class Login extends Component {

  render () {
    return (
      <div>
        <button>Generate New Keypair</button>
        <button>Import An Existing Keypair</button>
        <Link to="/">Dashboard</Link>
      </div>
    );
  }

}
