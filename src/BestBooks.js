import React from 'react';
import UpdateBook from './UpdateBook';
import { Carousel, Image, Button, Spinner } from 'react-bootstrap';
import { withAuth0 } from '@auth0/auth0-react';




class BestBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0,
      selectedBook: null
    }
  }

  componentDidMount() {
    this.props.getBooks();
  }

  onSelect = (selectedIdx) => {
    this.setState({ activeIndex: selectedIdx });
  }

  handleDelete = (bookId) => {
    this.props.deleteBook(bookId);
    if (this.state.activeIndex === this.props.books.length - 1) this.setState({ activeIndex: this.state.activeIndex - 1 })
  }

  selectBook = (book) => {
    this.setState({ selectedBook: book });
  }

  closeUpdateModal = () => {
    this.setState({ selectedBook: null });
  }


  render() {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <h2 style={{marginTop: '3rem'}}>My Library</h2>
        {this.props.loading ? <Spinner animation="border" role="status">
          <span className="visually-hidden"></span>
        </Spinner> :
          ((this.props.books.length > 0) ? (
            <>
              <UpdateBook
                book={this.state.selectedBook}
                updateBook={this.props.updateBook}
                handleClose={this.closeUpdateModal}
                show={!!this.state.selectedBook} />
              <Carousel
                activeIndex={this.state.activeIndex}
                onSelect={this.onSelect}
                style={{ maxWidth: '75vw', paddingTop: '4rem' }} interval={null}>
                {this.props.books.map(book => (
                  <Carousel.Item key={book._id} >
                    <Button style={{ position: 'absolute', top: '20px', right: '20px', zIndex: '1000' }} onClick={() => this.handleDelete(book._id)} variant="danger">X</Button>
                    <Button style={{ position: 'absolute', top: '20px', left: '20px', zIndex: '1000' }} onClick={() => this.selectBook(book)} variant="primary">Update</Button>
                    <Image fluid height={'100px'} width={'100px'} className="d-block w-100"
                      src="https://th.bing.com/th/id/R.8ab3c22a0e690d4dd01b287bc12505ae?rik=vevJMxg2RITAOg&riu=http%3a%2f%2fimg02.deviantart.net%2f06ed%2fi%2f2011%2f166%2f2%2f8%2fneutral_grey_radial_wallpaper_by_flambedude-d3iynlc.png&ehk=VCYGGT%2bYLnxer9sHYD9Pazd47b2MxdZPXBwd8NRmYKU%3d&risl=&pid=ImgRaw&r=0"
                      alt="coming soon"
                    />
                    <Carousel.Caption>
                      <h3>{book.title}</h3>
                      <p>{book.description}</p>
                      <p>{book.status}</p>
                    </Carousel.Caption>
                  </Carousel.Item>
                ))}
              </Carousel>
            </>
          )
            : (
              <h3>No Books Found</h3>
            ))
        }
      </div>
    )
  }
}

export default withAuth0(BestBooks);
