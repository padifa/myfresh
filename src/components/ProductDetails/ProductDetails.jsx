import React, { useState } from "react"; // Import React and useState for managing local state.
import { useSelector } from "react-redux"; // Import useSelector to access Redux state.
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"; // Import useHistory for navigation.
import { useParams } from "react-router-dom/cjs/react-router-dom.min"; // Import useParams to get route parameters.
import { Card, Container, Col, Row, Button } from "react-bootstrap"; // Import components from React-Bootstrap for styling.
import { useDispatch } from "react-redux"; // Import useDispatch to dispatch actions to the Redux store.
import moment from "moment"; // Import moment.js for date formatting.

function ProductDetails(props) {
  const { id } = useParams(); // Extract the product ID from the route parameters.
  console.log("my product id", id); // Log the product ID for debugging.

  const products = useSelector((store) => store.product); // Access the list of products from the Redux store.
  const user = useSelector((store) => store.user); // Access the current user from the Redux store.
  const history = useHistory(); // Initialize useHistory for navigation.
  const dispatch = useDispatch(); // Initialize useDispatch to dispatch actions.

  const product = products.find((product) => Number(product.id) === Number(id)); // Find the product that matches the ID from the route parameters.

  const [details, setDetails] = useState("Product Details"); // Initialize local state for storing product details (not used in this component).

  // Filter the products that belong to the current user (if they are a farmer).
  const myProducts = products.filter(
    (product) => Number(product.user_id) === Number(user.id)
  );
  console.log("My products", myProducts); // Log the user's products for debugging.

  // Navigate to the edit product form with the selected product ID.
  const handleEdit = (productId) => {
    history.push(`/edit/productForm/${productId}`);
    console.log("edit this product", productId); // Log the product ID being edited for debugging.
  };

  // Dispatch an action to delete the product and navigate back to the product list.
  const handleDelete = (productId) => {
    dispatch({
      type: "DELETE_PRODUCT",
      payload: productId,
    });
    history.push("/product"); // Redirect to the product list after deletion.
  };

  return (
    <>
      {/* Display the username of the logged-in user in a card. */}
      <Card>
        <h3 className="text-center mt-4" style={{ marginRight: "500px" }}>
          <strong>{user.username} </strong>
        </h3>
      </Card>

      {/* Main content area for the product details */}
      <div className="bg-white" style={{ padding: "20px" }}>
        <Container>
          {/* Show edit and remove buttons if the user is a farmer */}
          {user.role.toLowerCase() === "farmer" && (
            <div className="mb-3">
              <Button
                variant="secondary"
                onClick={() => handleEdit(product.id)}
              >
                Edit
              </Button>{" "}
              <Button variant="danger" onClick={() => handleDelete(product.id)}>
                Remove
              </Button>
            </div>
          )}

          {/* Check if the product exists and display its details */}
          {product?.id ? (
            <>
              <Row className="justify-content-center mb-4">
                <Col xs={12} md={8}>
                  <h1 className="text-center">{product.name}</h1>{" "}
                  {/* Product name */}
                  <img
                    src={product.image_url}
                    alt={product.name}
                    className="img-fluid mb-4"
                  />{" "}
                  {/* Product image */}
                  {/* Card displaying product details */}
                  <Card
                    className="shadow-sm mb-4"
                    style={{ backgroundColor: "#16A842" }}
                  >
                    <Card.Body className="d-flex flex-column justify-content-between">
                      <Card.Text
                        className="lead text-dark"
                        style={{
                          color: "white",
                          fontSize: "1.1rem",
                          lineHeight: "1.5",
                        }}
                      >
                        {product.description} {/* Product description */}
                        <br />
                        <strong>Category:</strong> {product.category}{" "}
                        {/* Product category */}
                        <br />
                        <strong>Stock Quantity:</strong>{" "}
                        {product.stock_quantity} {/* Product stock quantity */}
                        <br />
                        <strong>Created:</strong>{" "}
                        {moment(product.created_at).calendar()}{" "}
                        {/* Product creation date */}
                        <br />
                        <strong>Updated:</strong>{" "}
                        {moment(product.updated_at).calendar()}{" "}
                        {/* Product update date */}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </>
          ) : (
            <p className="text-center">Product not found</p> // Display message if product is not found.
          )}
        </Container>
      </div>
    </>
  );
}

export default ProductDetails; // Export the ProductDetails component for use in other parts of the app.
