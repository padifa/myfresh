import React from "react";
import { Link } from "react-router-dom";
import LogOutButton from "../LogOutButton/LogOutButton";
// import "./MyNav.css";
import { useSelector } from "react-redux";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";

function MyNav() {
  const user = useSelector((store) => store.user);

  return (
    <Navbar bg="success" expand="lg" variant="dark">
      <Container>
        {/* Logo on the left */}
        <Navbar.Brand as={Link} to="/home">
          <img
            src="/Images/MyFreshNew.png"
            alt="MyFresh logo"
            style={{ width: "150px", height: "auto" }} // Adjust size as needed
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          {/* Menu aligned to the right */}
          <Nav className="ms-auto">
            {!user.id ? (
              <Nav.Link as={Link} to="/login">
                Login / Register
              </Nav.Link>
            ) : (
              <>
                <Nav.Link as={Link} to="/user">
                  Home
                </Nav.Link>
                <Nav.Link as={Link} to="/product">
                  Products
                </Nav.Link>
                <Nav.Link as={Link} to="/order">
                  Orders
                </Nav.Link>
                <NavDropdown title="Log Out" id="basic-nav-dropdown">
                  {/* <NavDropdown.Item as={Link} to="/profile"></NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item> */}
                  <LogOutButton />
                </NavDropdown>
              </>
            )}
            <Nav.Link as={Link} to="/about">
              About
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MyNav;
