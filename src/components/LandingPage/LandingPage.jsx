import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
// CUSTOM COMPONENTS
import RegisterForm from "../RegisterForm/RegisterForm";

function LandingPage() {
  // Initialize the history object for navigation using react-router-dom
  const history = useHistory();

  // Function to navigate to the login page
  const onLogin = () => {
    history.push("/login");
  };

  return (
    // Outer div with a background image and styles for the landing page
    <div
      style={{
        backgroundImage: `url('/public/images/organic-products.jpg')`, // Background image URL
        backgroundSize: "cover", // Ensures the image covers the entire div
        backgroundPosition: "center", // Centers the image within the div
        minHeight: "100vh", // Sets minimum height to full viewport height
        display: "flex", // Flexbox for centering content
        alignItems: "center", // Aligns items vertically at the center
      }}
    >
      <div
        style={{
          backgroundImage: `url('/public/images/organic-products.jpg')`, // Repeated background styling
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
        }}
      >
        {/* Main container with padding and text color */}
        <Container className="text-black py-5">
          <Row className="justify-content-center">
            {/* Register/Login Section */}
            <Col md={4} className="d-flex flex-column align-items-center">
              {/* Card component with shadow effect */}
              <Card className="shadow-lg">
                <Card.Body className="text-center">
                  {/* RegisterForm is a custom component */}
                  <RegisterForm />
                  {/* Message for existing members */}
                  <h4 className="mt-4">Already a Member?</h4>
                  {/* Button to navigate to login */}
                  <Button
                    variant="success" // Bootstrap variant for a green button
                    size="sm" // Small button size
                    onClick={onLogin} // Calls the onLogin function when clicked
                    className="mt-3" // Adds top margin for spacing
                  >
                    Login
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}

export default LandingPage; // Exports the LandingPage component for use in other parts of the app
