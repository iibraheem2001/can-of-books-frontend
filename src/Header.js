import React from 'react';
import { Navbar, NavItem } from 'react-bootstrap';
import { Link } from "react-router-dom";
import './Header.css';
import LogoutButton from './LogoutButton';

class Header extends React.Component {
  render() {
    console.log('header', this.props.user);
    return (
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand>My Books</Navbar.Brand>
        {this.props.user?.email && (
          <>
            <NavItem><Link to="/" className="nav-link">Home</Link></NavItem>
            <NavItem><Link to='/profile' className="nav-link">Profile</Link></NavItem>
            <LogoutButton onLogout={this.props.onLogout} />
          </>
        )}
        {!this.props.user && (
          <NavItem><Link to="/login" className="nav-link">Log In</Link></NavItem>
        )}
      </Navbar>
    )
  }
}

export default Header;
