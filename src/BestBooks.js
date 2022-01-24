import React from 'react';
import { Carousel, Image, Button } from 'react-bootstrap';



class BestBooks extends React.Component {

  componentDidMount() {
    console.log('component mounted');
    this.props.getBooks();
  }

  render() {
    console.log('Best books', this.props.books)
    return (
      <div style={{display: 'flex', flexDirection:'column', alignItems: 'center', justifyContent: 'center', minHeight: '89vh'}}>
        <h2>My Library</h2>
        {this.props.books.length > 0 ? (
          <Carousel style={{maxWidth: '75vw', paddingTop: '4rem'}} interval={null}>
            {this.props.books.map(book => (
              <Carousel.Item key={book._id} >
                <Button style={{position: 'absolute', top:'20px', right: '20px', zIndex: '1000'}}onClick={() => this.props.deleteBook(book._id)} variant="danger">X</Button>
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
          )
        }
      </div>
    )
  }
}

export default BestBooks;
