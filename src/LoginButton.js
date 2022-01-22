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
    return (
      <>
        {this.state.isClicked ?
          <LoginForm loginHandler={this.props.loginHandler} />
          :
          <Button variant='primary' onClick={this.handleClick} >Log In</Button>
        }
      </>
    )
  }
}
