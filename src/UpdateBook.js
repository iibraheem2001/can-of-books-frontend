import React, { Component } from 'react';
import { Button, Container, Form, Modal } from 'react-bootstrap';



export default class UpdateBook extends Component {
  

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.updateBook({
      _id: this.props.book._id,
      title: event.target.title.value,
      description: event.target.description.value,
      status: event.target.status.value,
      email: this.props.book?.email
    })
    this.props.handleClose();
  }

  

  render() {
    return (
      <Modal show={this.props.show} onHide={this.props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update Book</Modal.Title>
        </Modal.Header>
        <Modal.Body> <Container>
          <Form onSubmit={this.handleSubmit}>
            <Form.Group className="mb-3" controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control type="text" defaultValue={this.props.book?.title}  />
            </Form.Group>
            <Form.Group className="mb-3" controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control type="text" defaultValue={this.props.book?.description} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="status">
              <Form.Label>Status</Form.Label>
              <Form.Control type="text" defaultValue={this.props.book?.status}  />
            </Form.Group>
            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control disabled placeholder={`${this.props.book?.email}`} />
            </Form.Group>
            <Button variant="primary" type="submit">
              Update
            </Button>
          </Form>
        </Container>
        </Modal.Body>
      </Modal>
    )
  }
}

