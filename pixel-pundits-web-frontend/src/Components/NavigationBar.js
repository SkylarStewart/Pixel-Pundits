import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useLocation, useNavigate } from "react-router-dom";
import {useContext} from 'react';
import {UserContext} from "../contexts/user.context";


const NavigationBar = () => {

  const navigate = useNavigate();
  const location = useLocation();

  const {logOutUser} = useContext(UserContext);

  const onLogout = async () => {
    //tries to log out
    try {
      const isLoggedOut = await logOutUser();
      if (isLoggedOut == true) {
        logoutRedirect();
      }
    }
    catch (error) {
      alert(error)
    }
  }
  const logoutRedirect = () => {
    navigate("/login")
  }


  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Navbar.Brand as={Link} to="/" style={{ marginLeft: "10px" }}>Pixel Pundits</Navbar.Brand> {/* Use Link component */}
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav" style={{ marginLeft: "10px" }}>
        <Nav className="mr-auto">
          <Nav.Link as={Link} to="../profile">Profile</Nav.Link>
          <Nav.Link as={Link} to="../trades">Trades</Nav.Link>
          <Nav.Link as={Link} to="../tutorial">Tutorial</Nav.Link>
          <Nav.Link as={Link} to="https://forms.gle/EbBAXG7thE7A8ubQ6" target="_blank" rel="noopener noreferrer">Debug and Feedback</Nav.Link>
          <Nav.Link onClick={onLogout}>Log Out</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavigationBar;