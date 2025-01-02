import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Form, Button, Container, Row, Col, Card } from "react-bootstrap";

function ProductEditForm() {
  const { id } = useParams(); // Extract the product ID from the URL parameters.
  console.log("MY PRODUCT ID", id);

  // 1. Find the product in the Redux store that matches the ID from useParams.
  const products = useSelector((store) => store.product); // Access the products from the Redux store.
  const product = products.find(
    (product) => Number(product?.id) === Number(id) // Match product ID with the parameter ID.
  );

  const user = useSelector((store) => store.user); // Access the user data from the Redux store.
  const dispatch = useDispatch(); // Initialize the Redux dispatch function.
  const history = useHistory(); // Initialize the useHistory hook for navigation.

  // Set up local state variables with product details or default values.
  const [name, setName] = useState(product?.name ?? "");
  const [price, setPrice] = useState(product?.price ?? "");
  const [category, setCategory] = useState(product?.category ?? "");
  const [description, setDescription] = useState(product?.description ?? "");
  const [stockQuantity, setStockQuantity] = useState(
    product?.stock_quantity ?? ""
  );
  const [imageUrl, setImageUrl] = useState(product?.image_url || "");
  const [farm, setFarm] = useState(product?.farm || "");

  // Handle form submission to update the product.
  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent the default form submission behavior.
    const updateProduct = {
      name, // Updated product name.
      price, // Updated product price.
      category, // Updated product category.
      description, // Updated product description.
      stock_quantity: stockQuantity, // Updated product stock quantity.
      farm, // Updated farm name.
      image_url: imageUrl, // Updated image URL.
    };
    console.log("the updated product", updateProduct);

    // Dispatch the update action to the Redux store.
    dispatch({
      type: "UPDATE_PRODUCT",
      payload: { id: id, data: updateProduct }, // Send the updated product data and ID.
    });

    // Navigate back to the product list page.
    history.push("/product");
  };

  // Effect to log the ID whenever it changes.
  useEffect(() => {
    console.log("get the id from url");
  }, [id]);

  return (
    <>
      {/* Display the username */}
      <Card>
        <h3 className="text-center mt-4" style={{ marginRight: "500px" }}>
          <strong>{user.username} </strong>
        </h3>
      </Card>

      {/* Form container for editing the product */}
      <Container>
        <h2 className="text-center my-4">Edit Product</h2>
        <Form onSubmit={handleSubmit}>
          <Row className="mb-3">
            {/* Product Name Input */}
            <Form.Group controlId="formProductName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter product name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                required
              />
              {/* Farm Name Input */}
              <Form.Group controlId="formImageUrl">
                <Form.Label>Farm</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter farm name"
                  value={farm}
                  onChange={(event) => setFarm(event.target.value)}
                  required
                />
              </Form.Group>
            </Form.Group>

            {/* Product Price Input */}
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
            {/* Product Category Input */}
            <Form.Group controlId="formProductCategory">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter category"
                value={category}
                onChange={(event) => setCategory(event.target.value)}
                required
              />
            </Form.Group>

            {/* Product Description Input */}
            <Form.Group controlId="formProductDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter description"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                required
              />
            </Form.Group>

            {/* Product Stock Quantity Input */}
            <Form.Group controlId="formStockQuantity">
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

          {/* Image URL Input */}
          <Form.Group controlId="formImageUrl">
            <Form.Label>Image URL</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter image URL"
              value={imageUrl}
              onChange={(event) => setImageUrl(event.target.value)}
              required
            />
          </Form.Group>

          {/* Submit Button */}
          <div className="d-flex justify-content-center">
            <Button variant="success" type="submit" className="mt-3">
              Update Product
            </Button>
          </div>
        </Form>
      </Container>
    </>
  );
}

export default ProductEditForm; // Export the component for use elsewhere.
