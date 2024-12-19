import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux"; // For dispatching actions and accessing Redux state
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"; // For navigation
import { Container, Form, Button, Row, Card } from "react-bootstrap"; // Bootstrap components

function ProductForm() {
  const dispatch = useDispatch(); // Hook for dispatching Redux actions
  const history = useHistory(); // Hook for navigating programmatically

  // Local state to manage form inputs
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [stockQuantity, setStockQuantity] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const user = useSelector((store) => store.user); // Accessing user data from Redux store

  // Handles form submission
  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission behavior

    // Create a new product object
    const newProduct = {
      name,
      price,
      category,
      description,
      stock_quantity: stockQuantity, // Note: Backend expects snake_case naming
      image_url: imageUrl,
    };

    console.log("The new product:", newProduct); // Debugging output

    // Dispatch an action to add the product
    dispatch({ type: "ADD_PRODUCT", payload: newProduct });

    // Navigate back to the product list page
    history.push("/product");
  };

  return (
    <>
      {/* User greeting with username */}
      <Card>
        <h3 className="text-center mt-4" style={{ marginRight: "500px" }}>
          <strong>{user.username}</strong>
        </h3>
      </Card>

      {/* Main container for the form */}
      <Container className="mt-5">
        <h2 className="text-center mb-4">Add New Product</h2>

        {/* Product form */}
        <Form onSubmit={handleSubmit}>
          <Row className="mb-3">
            {/* Name input */}
            <Form.Group controlId="formProductName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter product name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                required // Input validation
              />
            </Form.Group>

            {/* Price input */}
            <Form.Group controlId="formProductPrice">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter price"
                value={price}
                onChange={(event) => setPrice(event.target.value)}
                required
              />
            </Form.Group>
          </Row>

          <Row className="mb-3">
            {/* Category input */}
            <Form.Group controlId="formProductCategory">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter product category"
                value={category}
                onChange={(event) => setCategory(event.target.value)}
                required
              />
            </Form.Group>

            {/* Stock Quantity input */}
            <Form.Group controlId="formProductStock">
              <Form.Label>Stock Quantity</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter stock quantity"
                value={stockQuantity}
                onChange={(event) => setStockQuantity(event.target.value)}
                required
              />
            </Form.Group>
          </Row>

          {/* Description textarea */}
          <Form.Group className="mb-3" controlId="formProductDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter product description"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              required
            />
          </Form.Group>

          {/* Image URL input */}
          <Form.Group className="mb-3" controlId="formProductImageUrl">
            <Form.Label>Image URL</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter image URL"
              value={imageUrl}
              onChange={(event) => setImageUrl(event.target.value)}
              required
            />
          </Form.Group>

          {/* Submit button */}
          <div className="d-flex justify-content-center">
            <Button variant="success" type="submit">
              Add New Product
            </Button>
          </div>
        </Form>
      </Container>
    </>
  );
}

export default ProductForm;

/*
Summary of the Component:
1. This component collects product details through a form, such as name, price, category, stock quantity, description, and image URL.
2. It uses local state to manage form inputs and dispatches an action to add a new product to the store upon form submission.
3. After successful submission, it navigates the user back to the product list page.
4. Bootstrap is used for styling the form and layout.
5. The `user` state is accessed from Redux to display the username at the top.
*/
