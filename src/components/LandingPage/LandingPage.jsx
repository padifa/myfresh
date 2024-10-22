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
      <Container className="text-black py-5">
        <Row className="justify-content-center">
          <Col md={8}>
            <Card>
              <Card className="body">
                <h2>{heading}</h2>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Curabitur id felis metus. Vestibulum et pulvinar tortor. Morbi
                  pharetra lacus ut ex molestie blandit. Etiam et turpis sit
                  amet risus mollis interdum. Suspendisse et justo vitae metus
                  bibendum fringilla sed sed justo. Aliquam sollicitudin dapibus
                  lectus, vitae consequat odio elementum eget.
                </p>
                <p>
                  Praesent consectetur orci dui, id elementum eros facilisis id.
                  Sed id dolor in augue porttitor faucibus eget sit amet ante.
                  Nunc consectetur placerat pharetra. Aenean gravida ex ut erat
                  commodo, ut finibus metus facilisis.
                </p>
                <p>
                  Fusce porta diam ac tortor elementum, ut imperdiet metus
                  volutpat. Suspendisse posuere dapibus maximus. Aliquam vitae
                  felis libero. In vehicula sapien at semper ultrices.
                </p>
              </Card>
            </Card>
          </Col>
          <Col md={4} className="d-flex flex-column align-items-center">
            <Card>
              <Card className="body">
                <RegisterForm />
                <h4 className="mt-4">Already a Member?</h4>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={onLogin}
                  className="mt-2"
                >
                  Login
                </Button>
              </Card>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default LandingPage;
