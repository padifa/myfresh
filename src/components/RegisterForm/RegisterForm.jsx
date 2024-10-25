import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Col, Row, Button } from "react-bootstrap";
function RegisterForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [farmName, setFarmName] = useState("");
  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();

  const registerUser = (event) => {
    event.preventDefault();

    dispatch({
      type: "REGISTER",
      payload: {
        username: username,
        password: password,
        phone_number: phoneNumber,
        role: role,
        email: email,
        address: address,
        farm_name: farmName,
      },
    });
  };

  return (
    <Container
      fluid
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
    >
      {/* <Row className="justify-content-center">
        <Col xs={12} sm={10} md={8} lg={6}> */}
      <form
        className="formPanel p-4 border rounded shadow-lg"
        onSubmit={registerUser}
        style={{ background: "white" }}
      >
        <h2 className="text-center mb-4">Welcome to Your Fresh market</h2>
        {errors.registrationMessage && (
          <h3 className="alert alert-danger" role="alert">
            {errors.registrationMessage}
          </h3>
        )}
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            Username:
          </label>
          <input
            type="text"
            className="form-control"
            name="username"
            value={username}
            required
            onChange={(event) => setUsername(event.target.value)}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password:
          </label>
          <input
            type="password"
            className="form-control"
            name="password"
            value={password}
            required
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="role" className="form-label">
            Role:
          </label>
          <input
            type="text"
            className="form-control"
            name="role"
            value={role}
            required
            onChange={(event) => setRole(event.target.value)}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="phone-number" className="form-label">
            Phone Number:
          </label>
          <input
            type="text"
            className="form-control"
            name="phone-number"
            value={phoneNumber}
            required
            onChange={(event) => setPhoneNumber(event.target.value)}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            E-mail:
          </label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={email}
            required
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="address" className="form-label">
            Address:
          </label>
          <input
            type="text"
            className="form-control"
            name="address"
            value={address}
            required
            onChange={(event) => setAddress(event.target.value)}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="farm-name" className="form-label">
            Farm name: <span className="text-muted">(Only for farmers)</span>
          </label>
          <input
            type="text"
            className="form-control"
            name="farm-name"
            value={farmName}
            placeholder="Only for farmers"
            onChange={(event) => setFarmName(event.target.value)}
          />
        </div>

        <div className="d-grid">
          <Button variant="success" type="submit" className="btn-block">
            Register
          </Button>
        </div>
      </form>
      {/* </Col>
      </Row> */}
    </Container>
  );
}

export default RegisterForm;
