import React, { Component } from 'react';
import { Button, Container, Form, Modal } from 'react-bootstrap';
import axios from 'axios';
import { withAuth0 } from '@auth0/auth0-react';
const SERVER = process.env.REACT_APP_SERVER;




class AddBook extends Component {


  handleSubmit = (event) => {
    event.preventDefault();
    this.onCreate({
      title: event.target.title.value,
      description: event.target.description.value,
      status: event.target.status.value,
      email: this.props.auth0.user?.email
    })
    this.props.handleClose();
  }

  onCreate = async (newBook) => {
    const res = await this.props.auth0.getIdTokenClaims();
    const jwt = res.__raw
    const config = {
      headers: { 'Authorization': `Bearer ${jwt}` },
      method: 'post',
      baseURL: SERVER,
      url: '/books',
      data: newBook
    }
    try {
      const response = await axios(config);
      this.props.addBook(response.data);
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    return (
      <Modal
        show={this.props.show}
        onHide={this.props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Book</Modal.Title>
        </Modal.Header>
        <Modal.Body> <Container>
          <Form onSubmit={this.handleSubmit}>
            <Form.Group className="mb-3" controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control type="name" placeholder="Enter title" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control type="name" placeholder="Enter description" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="status">
              <Form.Label>Status</Form.Label>
              <Form.Control type="name" placeholder="Enter status" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="name" disabled placeholder={`${this.props.auth0.user?.email}`} />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Container>
        </Modal.Body>
      </Modal>
    )
  }
}

export default withAuth0(AddBook);