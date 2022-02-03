import React from 'react';
import Header from './Header';
import Footer from './Footer';
import AddBook from './AddBook';
import Login from './Login';
import BestBooks from './BestBooks';
import Profile from './Profile';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { withAuth0 } from '@auth0/auth0-react';
import { Alert } from 'react-bootstrap';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
const SERVER = process.env.REACT_APP_SERVER;

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      books: [],
      loading: true,
      alert: '',
      alertType: '',
      modalIsShown: false
    }
  }

 
  loginHandler = (userObj) => {
    this.setState({
      user: userObj
    })
  }


  showModal = () => {
    this.setState({ modalIsShown: true });
  }

  hideModal = () => {
    this.setState({ modalIsShown: false });
  }


  getBooks = async () => {
    if (this.props.auth0.isAuthenticated) {
      console.log(this.props.auth0);
      this.setState({ loading: true })
      const res = await this.props.auth0.getIdTokenClaims();
      const jwt = res.__raw
      const config = {
        headers: {'Authorization': `Bearer ${jwt}`},
        method: 'get',
        baseURL: SERVER,
        url: '/books'
      }
      const response = await axios(config);
      this.setState({books: response.data})
      this.setState({ loading: false });
    }
  }

  addBook = (book) => {
    this.setState({ books: [...this.state.books, book] });
    this.setAlert('Book successfully added', 'success');
  }

  deleteBook = async (id) => {
    const res = await this.props.auth0.getIdTokenClaims();
    const jwt = res.__raw
    const config = {
      headers: { 'Authorization': `Bearer ${jwt}` },
      method: 'delete',
      baseURL: SERVER,
      url: `/books/${id}`
    }
    try {
      const result = await axios(config);
      if (result.status === 202) {
        const filteredBooks = this.state.books.filter(book => book._id !== id);
        this.setState({ books: filteredBooks });
        this.setAlert('Book successfully deleted', 'success');
      }
    } catch (error) {
      console.log(error);
      this.setAlert('Unable to delete book', 'danger');
    }
  }

  updateBook = async (bookToBeUpdated) => {
    const res = await this.props.auth0.getIdTokenClaims();
    const jwt = res.__raw
    const config = {
      headers: { 'Authorization': `Bearer ${jwt}` },
      method: 'put',
      baseURL: SERVER,
      url: `/books/${bookToBeUpdated._id}`,
      data: bookToBeUpdated
    }
    try {
      await axios(config);
      const updatedBooks = this.state.books.map(currentBook => {
        if (currentBook._id === bookToBeUpdated._id) {
          return bookToBeUpdated;
        } else {
          return currentBook;
        }
      })
      this.setState({ books: updatedBooks });
      this.setAlert('Book successfully updated', 'success');
    } catch (error) {
      console.log(error);
      this.setAlert('Unable to delete book', 'danger');
    }
  }

  setAlert = (msg, type) => {
    this.setState({ alert: msg, alertType: type });
    setTimeout(() => this.setState({ alert: '', alertType: '' }), 4000);
  }

  render() {
    return (
      <>
        <Router>
          <Header
            isAuthenticated={this.props.auth0.isAuthenticated}
            onLogout={this.logoutHandler}
            showModal={this.showModal} />
          <Switch>
            <Route exact path="/">
              {this.state.alert && <Alert style={{ position: 'fixed', top: '56px', left: '0', width: '100%', textAlign: 'center' }} variant={this.state.alertType}>
                {this.state.alert}
              </Alert>}
              {this.props.auth0.isAuthenticated &&
                <BestBooks
                  books={this.state.books}
                  getBooks={this.getBooks}
                  deleteBook={this.deleteBook}
                  show={this.state.modalIsShown}
                  showModal={this.showModal}
                  handleClose={this.hideModal}
                  updateBook={this.updateBook}
                  loading={this.state.loading}
                />}
              <AddBook
                show={this.state.modalIsShown}
                handleClose={this.hideModal}
                addBook={this.addBook} />
            </Route>
            <Route exact path="/profile">
              <Profile isAuthenticated={this.props.auth0.isAuthenticated}/>
            </Route>
            <Route exact path="/login">
              <Login />
            </Route>
          </Switch>
          <Footer />
        </Router>
      </>
    )
  }
}

export default withAuth0(App);
