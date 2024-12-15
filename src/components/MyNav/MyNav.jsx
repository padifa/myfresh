import React from "react"; // Import React library for component creation.
import { Link } from "react-router-dom"; // Import Link for client-side routing.
import LogOutButton from "../LogOutButton/LogOutButton"; // Import custom logout button component.
// import "./MyNav.css"; // Commented out custom CSS import as it may be unused.
import { useSelector } from "react-redux"; // Import useSelector to access Redux store state.
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap"; // Import Bootstrap components for styling.

function MyNav() {
  // Access the `user` slice of the Redux store to check user authentication state.
  const user = useSelector((store) => store.user);

  return (
    <Navbar bg="success" expand="lg" variant="dark">
      {/* Navbar component with green background and dark variant */}
      <Container>
        {/* Container for centering navbar content */}
        {/* Logo on the left */}
        <Navbar.Brand as={Link} to="/home">
          {/* Use react-router's Link to navigate to the home page */}
          <img
            src="/Images/MyFreshNew.png" // Path to the logo image.
            alt="MyFresh logo" // Alternative text for accessibility.
            style={{ width: "150px", height: "auto" }} // Inline styles for image size.
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        {/* Hamburger menu for mobile view */}
        <Navbar.Collapse id="basic-navbar-nav">
          {/* Collapsible section for navigation links */}
          <Nav className="ms-auto">
            {/* Align navigation links to the right */}
            {!user.id ? (
              // If user is not logged in, show Login/Register link
              <Nav.Link as={Link} to="/login">
                Login / Register
              </Nav.Link>
            ) : (
              // If user is logged in, show additional navigation links
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
                <Nav.Link
                  className="success" // Additional styling class for logout link.
                  title="Log Out" // Tooltip title for the link.
                  id="basic-nav-dropdown"
                >
                  {/* LogOutButton component to handle user logout */}
                  <LogOutButton />
                </Nav.Link>
              </>
            )}
            <Nav.Link as={Link} to="/about">
              {/* Link to the About page */}
              About
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MyNav; // Export the component for use in other parts of the application.
