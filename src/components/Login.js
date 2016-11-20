import React, { Component } from 'react';
import { Link } from 'react-router';

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
