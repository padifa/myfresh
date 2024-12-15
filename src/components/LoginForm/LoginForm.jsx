import React, { useState } from "react"; // Import React and the useState hook for managing component state.
import { useDispatch } from "react-redux"; // Import useDispatch for dispatching Redux actions.
import { useSelector } from "react-redux"; // Import useSelector for accessing the Redux store state.
import { Container, Col, Row, Button, Form } from "react-bootstrap"; // Import Bootstrap components for styling.

function LoginForm() {
  // Define state variables for username and password.
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Access the `errors` slice of the Redux store state.
  const errors = useSelector((store) => store.errors);

  // Get the dispatch function from Redux to dispatch actions.
  const dispatch = useDispatch();

  // Handler for login form submission.
  const login = (event) => {
    event.preventDefault(); // Prevent default form submission behavior.

    // Check if both username and password are provided.
    if (username && password) {
      dispatch({
        type: "LOGIN", // Dispatch a `LOGIN` action with the username and password as payload.
        payload: {
          username: username,
          password: password,
        },
      });
    } else {
      dispatch({ type: "LOGIN_INPUT_ERROR" }); // Dispatch an error action if inputs are missing.
    }
  };

  return (
    <Container className="mt-5">
      {" "}
      {/* Bootstrap container with top margin */}
      <Form className="formPanel" onSubmit={login}>
        {" "}
        {/* Form with submission handler */}
        <h2>Login</h2>
        {/* Display error message if it exists in the Redux store */}
        {errors.loginMessage && (
          <h3 className="alert text-danger" role="alert">
            {errors.loginMessage}
          </h3>
        )}
        <Form.Group controlId="username">
          {" "}
          {/* Form group for username input */}
          <Form.Label>Username:</Form.Label>
          <Form.Control
            type="text" // Input type text for username.
            placeholder="Enter your username" // Placeholder text.
            required // Makes the field mandatory.
            value={username} // Binds input value to state.
            onChange={(event) => setUsername(event.target.value)} // Updates state on input change.
          />
        </Form.Group>
        <Form.Group controlId="password">
          {" "}
          {/* Form group for password input */}
          <Form.Label>Password:</Form.Label>
          <Form.Control
            type="password" // Input type password for masked input.
            placeholder="Enter your password" // Placeholder text.
            required // Makes the field mandatory.
            value={password} // Binds input value to state.
            onChange={(event) => setPassword(event.target.value)} // Updates state on input change.
          />
        </Form.Group>
        <Button variant="success" type="submit" className="w-100 mt-3">
          {/* Submit button styled with Bootstrap */}
          Log In
        </Button>
      </Form>
    </Container>
  );
}

export default LoginForm; // Export the component for use in other parts of the app.
