import React from 'react';
import { Navbar, NavItem, Nav } from 'react-bootstrap';
import { Link } from "react-router-dom";
import './Header.css';
import LogoutButton from './LogoutButton';
import {Button} from 'react-bootstrap';

class Header extends React.Component {
  render() {
    return (
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Nav className="container-fluid">
        <Navbar.Brand>My Books</Navbar.Brand>
        {this.props.isAuthenticated && (
          <div style={{display: 'flex', flexDirection: 'row', alignSelf: 'flex-start'}}>
            <NavItem><Link to="/" className="nav-link"><Button>Home</Button></Link></NavItem>
            <NavItem><Link to='/profile' className="nav-link"><Button>Profile</Button></Link></NavItem>
            <NavItem><Link to="/" onClick={this.props.showModal} className="nav-link"><Button>Add Book</Button></Link></NavItem>
          </div>
        )}
        <LogoutButton onLogout={this.props.onLogout} />
        {!this.props.isAuthenticated && (
          <div>
          <NavItem className="ms-auto"><Link to="/login" className="nav-link"><Button>Log In</Button></Link></NavItem>
          </div>
        )}
        </Nav>
      </Navbar>
    )
  }
}

export default Header;
