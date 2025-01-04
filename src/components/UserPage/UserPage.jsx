import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { Container, Button, Row, Col, Card } from "react-bootstrap";
import { useState } from "react";

function UserPage() {
  // Accessing the current user from the Redux store
  const user = useSelector((store) => store.user);

  // Accessing the list of products from the Redux store
  const products = useSelector((store) => store.product);

  // Setting up history object for navigation
  const history = useHistory();

  // Setting up dispatch to send actions to the Redux store
  const dispatch = useDispatch();

  // Accessing the cart items from the Redux store
  const cart = useSelector((store) => store.cart);

  // Local state to manage product quantity
  const [quantity, setQuantity] = useState(1);

  // Navigate to the product details page
  const viewDetails = (productId) => {
    console.log("navigate to product detail page", productId);
    history.push(`/details/${productId}`);
  };

  // Navigate to the product edit form
  const handleEdit = (productId) => {
    history.push(`/edit/productForm/${productId}`);
  };

  // Dispatch an action to delete a product
  const handleDelete = (productId) => {
    dispatch({
      type: "DELETE_PRODUCT",
      payload: productId,
    });
  };

  // Navigate to the product creation form
  const addProduct = () => {
    history.push(`/productForm`);
  };

  // Adjust the quantity of a product
  const adjustQuantity = (amount) => {
    if (amount === "increase") {
      setQuantity(quantity + 1);
    } else if (amount === "decrease" && quantity > 1) {
      setQuantity(quantity - 1);
    } else {
      setQuantity(1);
    }
  };

  // Navigate to the cart page
  const goToCart = () => {
    history.push(`/cart`);
  };

  // Add a product to the cart
  const addToCart = (product) => {
    console.log("add item to the cart", product);
    // Create a new cart item with additional quantity property
    const cartItem = { ...product };
    cartItem.quantity = quantity;

    // Dispatch an action to add the product to the cart
    dispatch({
      type: "ADD_TO_CART",
      payload: cartItem,
    });
  };

  // Filter products based on the user's role
  const displayedProducts =
    user.role.toLowerCase() === "farmer"
      ? products.filter(
          (product) => Number(product.user_id) === Number(user.id)
        )
      : products;

  return (
    <>
      <Container className="mb-3">
        {/* Show cart button and cart count if the user is a customer */}
        {user.role.toLowerCase() === "customer" && (
          <Row>
            <Col className="d-flex justify-content-start">
              <Button variant="success" onClick={goToCart}>
                Go To Cart
              </Button>
              {cart?.length > 0 && (
                <h1 className="ms-3">Cart: {cart.length}</h1>
              )}
            </Col>
          </Row>
        )}

        {/* Welcome message */}
        <h1 className="text-center mt-4">
          Welcome <strong>{user.username}</strong> to Our Fresh Product
          Marketplace
        </h1>

        {/* Instructional message based on user role */}
        <p className="text-center mb-4">
          {user.role.toLowerCase() === "farmer"
            ? "Manage your organic product listings below. Add, edit, or remove items to keep your offerings fresh and up-to-date."
            : "Browse through a selection of fresh, organic products from local farmers."}
        </p>

        {/* Add product button for farmers */}
        {user.role.toLowerCase() === "farmer" && (
          <Button variant="success" onClick={addProduct} className="mb-3">
            Add Product
          </Button>
        )}

        {/* Display products */}
        <Row>
          {displayedProducts.map((product) => (
            <Col md={4} sm={6} xs={12} className="mb-4" key={product.id}>
              <Card>
                {/* Product image */}
                <Card.Img
                  variant="top"
                  src={product.image_url || "public/Images/apple.jpeg"}
                  alt={product.name}
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <Card.Body>
                  {/* Product details */}
                  <Card.Title>{product.name}</Card.Title>
                  <Card.Text>
                    <strong>Category:</strong> {product.category}
                    <br />
                    <strong>Price:</strong> ${product.price}
                    <br />
                    <strong>Quantity:</strong> {quantity}
                    <br />
                    {product.description}
                  </Card.Text>

                  {/* Buttons for farmers */}
                  {user.role.toLowerCase() === "farmer" ? (
                    <div className="d-flex justify-content-between">
                      <Button
                        variant="success"
                        onClick={() => handleEdit(product.id)}
                        className="me-2"
                      >
                        Edit
                      </Button>
                      <Button
                        variant="danger"
                        onClick={() => handleDelete(product.id)}
                      >
                        Remove
                      </Button>
                    </div>
                  ) : (
                    // Buttons for customers
                    <div className="d-flex justify-content-between">
                      <Button
                        variant="success"
                        size="sm"
                        onClick={() => adjustQuantity("increase")}
                        className="me-2"
                      >
                        +1
                      </Button>

                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => adjustQuantity("decrease")}
                        className="me-2"
                      >
                        -1
                      </Button>

                      <Button
                        variant="success"
                        size="sm"
                        onClick={() => addToCart(product)}
                        className="me-2"
                      >
                        Add To Cart
                      </Button>

                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => viewDetails(product.id)}
                        className="me-2"
                      >
                        View Details
                      </Button>
                    </div>
                  )}
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
}

export default UserPage;
