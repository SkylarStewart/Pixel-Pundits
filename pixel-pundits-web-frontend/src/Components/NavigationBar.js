import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const NavigationBar = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Navbar.Brand as={Link} to="/" style = {{marginLeft: "10px"}}>Pixel Pundits</Navbar.Brand> {/* Use Link component */}
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav" style={{marginLeft: "10px"}}>
        <Nav className="mr-auto">
          <Nav.Link as={Link} to="../profile">Profile</Nav.Link>
          <Nav.Link as={Link} to="../trades">Trades</Nav.Link>
          <Nav.Link as={Link} to="../tutorial">Tutorial</Nav.Link>
          <Nav.Link as={Link} to="https://forms.gle/EbBAXG7thE7A8ubQ6" target="_blank" rel="noopener noreferrer">Debug and Feedback</Nav.Link>
          <Nav.Link as={Link} to = "../login">Log Out</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavigationBar;