import React from "react";
// To bring info from the redux state, I need to import dispatch and selector
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { logout } from "../actions/userActions";

const Header = () => {
  // dispatch the logout function
  const dispatch = useDispatch();

  // bring user info from the state
  // we can set conditional statements to show info on the navbar
  // if we have user info or not
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin; // i want the user info fomr the userLogin

  // LOGOUT HANDLER
  const logoutHandler = () => {
    dispatch(logout())
  };

  return (
    <header>
      <Navbar bg='info' variant='dark' expand='lg' collapseOnSelect>
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand>
              {" "}
              <img
                src='/nav_bar_logo.png'
                width='30'
                height='30'
                className='d-inline-block align-top'
                alt='brain logo'
              />{" "}
              Expatologist
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ml-auto'>
              <LinkContainer to='/cart'>
                <Nav.Link>
                  <i className='fas fa-shopping-cart'></i>Cart
                </Nav.Link>
              </LinkContainer>
              {userInfo ? (
                <NavDropdown
                  title={userInfo.name}
                  id='username'
                >
                  <LinkContainer to='/profile'>
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to='/login'>
                  <Nav.Link>
                    <i className='fas fa-user'></i>Sign in or Register
                  </Nav.Link>
                </LinkContainer>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
