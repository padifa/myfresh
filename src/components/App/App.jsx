import React, { useEffect } from "react";
import {
  HashRouter as Router, // Router to handle navigation with hash-based URLs
  Redirect, // Redirect to different routes
  Route, // Define specific routes
  Switch, // Render the first matching route
} from "react-router-dom";

import { useDispatch, useSelector } from "react-redux"; // Hooks for Redux state management

import MyNav from "../MyNav/MyNav"; // Custom navigation bar component
import Footer from "../Footer/Footer"; // Footer component

import ProtectedRoute from "../ProtectedRoute/ProtectedRoute"; // Custom route component for authenticated users

import AboutPage from "../AboutPage/AboutPage"; // About page component
import UserPage from "../UserPage/UserPage"; // User dashboard component
import InfoPage from "../InfoPage/InfoPage"; // Info page component
import LandingPage from "../LandingPage/LandingPage"; // Landing page for unauthenticated users
import LoginPage from "../LoginPage/LoginPage"; // Login page component
import RegisterPage from "../RegisterPage/RegisterPage"; // Registration page component

import OrderPage from "../OrderPage/OrderPage"; // Order page component
import "./App.css"; // App-specific styles
import ProductList from "../ProductList/ProductList"; // Component to display the list of products
import ProductDetails from "../ProductDetails/ProductDetails"; // Component to show product details
import ProductForm from "../ProductForm/ProductForm"; // Form to add new products
import CartList from "../CartList/CartList"; // Component to show cart items
import ProductEditForm from "../ProductForm/ProductEditForm"; // Form to edit existing products
import ReceiptPage from "../ReceiptPage/ReceiptPage"; // Component to show the receipt
import "bootstrap/dist/css/bootstrap.min.css"; // Bootstrap for styling

function App() {
  const dispatch = useDispatch(); // Hook to dispatch Redux actions
  const user = useSelector((store) => store.user); // Select user data from Redux store

  // Fetch user data when the component mounts
  useEffect(() => {
    dispatch({ type: "FETCH_USER" });
  }, [dispatch]);

  // Fetch product data when the component mounts
  useEffect(() => {
    dispatch({ type: "FETCH_PRODUCT" });
  }, [dispatch]);

  return (
    <Router>
      <div>
        <MyNav /> {/* Navigation bar */}
        <Switch>
          {/* Visiting localhost:5173 will redirect to localhost:5173/home */}
          <Redirect exact from="/" to="/home" />

          {/* Visiting localhost:5173/about will show the about page. */}
          <Route
            // shows AboutPage at all times (logged in or not)
            exact
            path="/about"
          >
            <AboutPage />
          </Route>

          {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:5173/user will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the LoginPage (component).
            Even though it seems like they are different pages, the user is always on localhost:5173/user */}
          <ProtectedRoute
            // logged in shows UserPage else shows LoginPage
            exact
            path="/user"
          >
            <UserPage />
          </ProtectedRoute>

          <ProtectedRoute
            // logged in shows InfoPage else shows LoginPage
            exact
            path="/info"
          >
            <InfoPage />
          </ProtectedRoute>

          {/* Route to display the product list */}
          <ProtectedRoute exact path="/product">
            <ProductList />
          </ProtectedRoute>

          {/* Route to display details of a specific product */}
          <ProtectedRoute exact path="/details/:id">
            <ProductDetails />
          </ProtectedRoute>

          {/* Route to display the order page */}
          <ProtectedRoute exact path="/order">
            <OrderPage />
          </ProtectedRoute>

          {/* Route to display the form for adding new products */}
          <ProtectedRoute exact path="/productForm">
            <ProductForm />
          </ProtectedRoute>

          {/* Route to display the form for editing an existing product */}
          <ProtectedRoute exact path="/edit/productForm/:id">
            <ProductEditForm />
          </ProtectedRoute>

          {/* Route to display the cart */}
          <ProtectedRoute exact path="/cart">
            <CartList />
          </ProtectedRoute>

          {/* Route to display the receipt page */}
          <ProtectedRoute exact path="/receipt-page/:orderId">
            <ReceiptPage />
          </ProtectedRoute>

          {/* Route to display the login page */}
          <Route exact path="/login">
            {user.id ? (
              // If the user is already logged in,
              // redirect to the /user page
              <Redirect to="/user" />
            ) : (
              // Otherwise, show the login page
              <LoginPage />
            )}
          </Route>

          {/* Route to display the registration page */}
          <Route exact path="/registration">
            {user.id ? (
              // If the user is already logged in,
              // redirect them to the /user page
              <Redirect to="/user" />
            ) : (
              // Otherwise, show the registration page
              <RegisterPage />
            )}
          </Route>

          {/* Route to display the landing page */}
          <Route exact path="/home">
            {user.id ? (
              // If the user is already logged in,
              // redirect them to the /user page
              <Redirect to="/user" />
            ) : (
              // Otherwise, show the Landing page
              <LandingPage />
            )}
          </Route>

          {/* If none of the other routes matched, we will show a 404. */}
          <Route>
            <h1>404</h1> {/* Page not found */}
          </Route>
        </Switch>
        <Footer /> {/* Footer component */}
      </div>
    </Router>
  );
}

export default App;

/*
Summary:
1. The `App` component sets up the main structure of the application, defining routes and navigation.
2. Protected routes ensure that certain pages are accessible only to logged-in users.
3. The `Switch` component renders the first matching route.
4. Redux is used to fetch user and product data when the application loads.
5. Bootstrap is integrated for consistent styling across components.
*/
