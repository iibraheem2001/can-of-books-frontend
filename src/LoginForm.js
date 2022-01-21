import { Component } from "react";
import Form from 'bootstrap';
import FormGroup from "bootstrap";
import Button from 'bootstrap';

class LoginForm extends Component {

  render() {
    /* TODO: create a simple login form that collects username and and email, and lets parent component know when form has been submitted */
    return (
      <Form>
        <FormGroup className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control type="name" placeholder="Enter name"></Form.Control>
        </FormGroup>

        <FormGroup className="mb-3">
          <Form.Label>E-mail</Form.Label>
          <Form.Control type="email" placeholder="Enter e-mail"></Form.Control>
        </FormGroup>
        <Button variant="primary" type="submit">Submit</Button>
      </Form>
    );
  }
};

export default LoginForm;
