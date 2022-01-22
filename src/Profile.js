import { Component } from "react";
import { Redirect } from "react-router-dom";

class Profile extends Component {

  render() {
    if (!this.props.user?.email) {
      return <Redirect to='/' />
    }
    return (
      <div>
        <p>Username: {this.props.user.name}</p>
        <p>Email: {this.props.user.email}</p>
      </div>
    )
  }
};

export default Profile;
