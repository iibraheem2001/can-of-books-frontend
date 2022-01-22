import React from 'react';
import axios from 'axios';
import { Carousel } from 'react-bootstrap';
import Image from 'react-bootstrap/Image';
const SERVER = process.env.REACT_APP_SERVER;

class BestBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: []
    }
  }


  componentDidMount() {
    this.getBooks(this.props.user.email);
  }

  getBooks = async (user) => {
    let apiUrl = `${SERVER}/books?user=${user}`;

    try {
      const response = await axios.get(apiUrl);
      this.setState({ books: response.data });
    } catch (err) {
      console.log(err);
    }
  }

  render() {

    /* TODO: render user's books in a Carousel */
    return (
      <>
        <h2>My Library</h2>

        {this.state.books.length ? (
          <Carousel>
            {this.state.books.map(book => (
              <Carousel.Item key={book._id}>
                <Image fluid height={'100px'} width={'100px'} className="d-block w-100"
                  src="https://th.bing.com/th/id/R.8ab3c22a0e690d4dd01b287bc12505ae?rik=vevJMxg2RITAOg&riu=http%3a%2f%2fimg02.deviantart.net%2f06ed%2fi%2f2011%2f166%2f2%2f8%2fneutral_grey_radial_wallpaper_by_flambedude-d3iynlc.png&ehk=VCYGGT%2bYLnxer9sHYD9Pazd47b2MxdZPXBwd8NRmYKU%3d&risl=&pid=ImgRaw&r=0"
                  alt="coming soon"
                />
                <Carousel.Caption>
                  <h3>{book.title}</h3>
                  <p>{book.description}</p>
                </Carousel.Caption>
              </Carousel.Item>
            ))}
          </Carousel>
        )
          : (
            <h3>No Books Found :(</h3>
          )}
      </>
    )
  }
}

export default BestBooks;
