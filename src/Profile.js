import { Component } from "react";
import { Redirect } from "react-router-dom";
import {withAuth0} from '@auth0/auth0-react';

class Profile extends Component {

  render() {
    if (!this.props.isAuthenticated) {
      return <Redirect to='/' />
    }
    return (
      <div>
        <p>Username: {this.props.auth0.user.name}</p>
        <p>Email: {this.props.auth0.user.email}</p>
      </div>
    )
  }
};

export default withAuth0(Profile);
