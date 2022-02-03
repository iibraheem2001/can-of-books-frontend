import React from 'react';
import Card from 'react-bootstrap/Card';
import './Login.css';
import LoginButton from './LoginButton';

class Login extends React.Component {
  render() {
    return (
      <Card style={{ width: '18rem', marginTop: '10rem' }}>
        <Card.Body>
          <Card.Title>Log In</Card.Title>
          <Card.Text>
            Log in to see your books
          </Card.Text>
          <LoginButton loginHandler={this.props.loginHandler} />
        </Card.Body>
      </Card>
    )
  }
}

export default Login;
