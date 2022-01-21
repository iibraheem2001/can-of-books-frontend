import { Component } from 'react'
import Button from 'react-bootstrap/Button';
import LoginForm from './LoginForm';

export default class LoginButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isClicked: false
    }
  }

  handleClick = () => {
    this.setState({ isClicked: true });
  }

  render() {

    /* Render a button with label 'Log In'. When the button is clicked then show LoginForm instead */
    return (
      <>
        {this.state.isClicked ?
          <LoginForm />
          :
          <Button variant='primary' onClick={this.handleClick}>Log In</Button>
        }
      </>
    )
  }
}
