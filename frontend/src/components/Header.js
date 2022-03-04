import React from "react";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from '../actions/userAction'

function Header() {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const dispatch=useDispatch()
  const logoutHandler=()=>{
    dispatch(logout())
  }

  return (
    <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
      <Container>
        <Link to="/">
          <Navbar.Brand>ProShop</Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            
              <Navbar className="navbar text-white">
              <Link to="/cart/" className="text-white" style={{ marginRight: 10 }}>
                <i className="fas fa-shopping-cart"></i>cart
                </Link>
              </Navbar>
           
            
            <Navbar>
            {userInfo ? (
              <NavDropdown className="text-white" title={userInfo.name} id="username">
                
                  <NavDropdown.Item><Link to="/profile/">Profile</Link></NavDropdown.Item>
                
                <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
              </NavDropdown>
            ) : (
              <Link to="/login/">
                <Navbar className="navbar text-white">
                  <i className="fas fa-user"></i>Login
                </Navbar>
              </Link>
            )}
            </Navbar>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
