import React from "react";
import { useHistory } from "react-router-dom"; // Importing useHistory for navigation
import RegisterForm from "../RegisterForm/RegisterForm"; // Importing the RegisterForm component

// RegisterPage component serves as a container for the registration form
// and includes a button to navigate to the login page.
function RegisterPage() {
  const history = useHistory(); // useHistory hook allows navigation between routes

  return (
    <div>
      {/* Render the RegisterForm component */}
      <RegisterForm />

      <center>
        {/* Button that navigates to the login page when clicked */}
        <button
          type="button"
          className="btn btn_asLink" // Styling applied to the button
          onClick={() => {
            history.push("/login"); // Redirect to the login page
          }}
        >
          Login {/* Text displayed on the button */}
        </button>
      </center>
    </div>
  );
}

export default RegisterPage;

// Comments Summary:
// 1. The component uses the React Router `useHistory` hook to programmatically navigate to the login page.
// 2. It renders the `RegisterForm` component, which likely handles user registration.
// 3. The button styled with `btn_asLink` is wrapped in a `center` tag to align it centrally on the page.
// 4. This component is straightforward and focuses on combining the registration form with navigation functionality.
