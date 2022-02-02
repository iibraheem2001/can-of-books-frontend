import React from 'react';
import Header from './Header';
import Footer from './Footer';
import AddBook from './AddBook';
import Login from './Login';
import BestBooks from './BestBooks';
import Profile from './Profile';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
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
      user: null,
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

  logoutHandler = () => {
    this.setState({
      user: null,
    })
  }

  showModal = () => {
    this.setState({ modalIsShown: true });
  }

  hideModal = () => {
    this.setState({ modalIsShown: false });
  }


  getBooks = async () => {
    let apiUrl = `${SERVER}/books?user=${this.state.user.email}`;
    this.setState({ loading: true })
    try {
      const response = await axios.get(apiUrl);
      this.setState({ loading: false });
      this.setState({ books: response.data });
    } catch (err) {
      console.log(err);
      this.setAlert('Unable to get books', 'danger');
    }
  }

  addBook = (book) => {
    this.setState({ books: [...this.state.books, book] });
    this.setAlert('Book successfully added', 'success');
  }

  deleteBook = async (id) => {
    const url = `${SERVER}/books/${id}`;
    try {
      const result = await axios.delete(url);
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
    const url = `${SERVER}/books/${bookToBeUpdated._id}`;
    try {
      await axios.put(url, bookToBeUpdated);
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
    console.log(this.state.books);
    return (
      <>
        <Router>
          <Header 
          user={this.state.user} 
          onLogout={this.logoutHandler} 
          showModal={this.showModal} />
          <Switch>
            <Route exact path="/">
              {this.state.alert && <Alert style={{ position: 'fixed', top: '56px', left: '0', width: '100%', textAlign: 'center' }} variant={this.state.alertType}>
                {this.state.alert}
              </Alert>}
              {this.state.user?.email &&
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
              user={this.state.user} 
              show={this.state.modalIsShown} 
              handleClose={this.hideModal} 
              addBook={this.addBook} />
            </Route>
            <Route exact path="/profile">
              <Profile user={this.state.user} />
            </Route>
            <Route exact path="/login">
              <Login loginHandler={this.loginHandler} />
            </Route>
          </Switch>
          <Footer />
        </Router>
      </>
    )
  }
}

export default App;
