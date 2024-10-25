import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
// CUSTOM COMPONENTS
import RegisterForm from "../RegisterForm/RegisterForm";

function LandingPage() {
  const [heading, setHeading] = useState("Welcome");
  const history = useHistory();

  const onLogin = () => {
    history.push("/login");
  };

  return (
    <div
      style={{
        backgroundImage: `url('/public/images/organic-products.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
      }}
    >
      <div
        style={{
          backgroundImage: `url('/public/images/organic-products.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Container className="text-black py-5">
          <Row className="justify-content-center">
            {/* Register/Login Section */}{" "}
            <Col md={4} className="d-flex flex-column align-items-center">
              <Card className="shadow-lg">
                <Card.Body className="text-center">
                  <RegisterForm />
                  <h4 className="mt-4">Already a Member?</h4>
                  <Button
                    variant="success"
                    size="sm"
                    onClick={onLogin}
                    className="mt-3"
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

export default LandingPage;
