import React from "react";
import LoginForm from "../LoginForm/LoginForm";
import { useHistory } from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap";

function LoginPage() {
  const history = useHistory();

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col xs={12} md={6}>
          <LoginForm />
        </Col>
      </Row>
      <Row className="justify-content-center mt-3">
        <Col xs="auto">
          <Button
            variant="link"
            onClick={() => {
              history.push("/registration");
            }}
            className="text-decoration-none"
          >
            Register
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

export default LoginPage;
