import { Component } from "react";
import { Form, FormGroup, Button } from 'react-bootstrap';
import { Redirect } from "react-router-dom";



class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        name: '',
        email: ''
      },
      redirect: null
    }
  }

  saveUserEmail = (event) => {
    this.setState({ user: { ...this.state.user, email: event.target.value.toLowerCase() } })
  }

  saveUserName = (event) => {
    this.setState({ user: { ...this.state.user, name: event.target.value } })
  }


  handleSubmit = () => {
    this.props.loginHandler(this.state.user)
    this.setState({ redirect: "/" });

  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />
    }
    return (
      <>
        <Form>
          <FormGroup className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control onChange={this.saveUserName} type="name" required placeholder="Enter name"></Form.Control>
          </FormGroup>
          <FormGroup className="mb-3">
            <Form.Label>E-mail</Form.Label>
            <Form.Control onChange={this.saveUserEmail} type="email" required placeholder="Enter e-mail"></Form.Control>
          </FormGroup>
          <Button onClick={this.handleSubmit} variant="primary">Submit</Button>
        </Form>
      </>
    );
  }
};

export default LoginForm;
