import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
function ProductForm() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [stockQuantity, setStockQuantity] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const newProduct = {
      name,
      price,
      category,
      description,
      stock_quantity: stockQuantity,

      image_url: imageUrl,
    };
    console.log("the new product", newProduct);
    dispatch({ type: "ADD_PRODUCT", payload: newProduct });
    history.push("/product");
  };

  return (
    <Container className="mt-5">
      <h2 className="text-center mb-4">Add New Product</h2>
      <Form onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Form.Group controlId="formProductName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter product name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
            />
          </Form.Group>

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

        <div className="d-flex justify-content-center">
          <Button variant="success" type="submit">
            Add New Product
          </Button>
        </div>
      </Form>
    </Container>
  );
}
export default ProductForm;
