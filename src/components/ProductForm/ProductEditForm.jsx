import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
function ProductEditForm() {
  const { id } = useParams();
  console.log("MY PRODUCT ID", id);

  //1. find the product in the redux store with the id that matches the 'id' from useParams.
  //2. set local state to use the found product?.
  const products = useSelector((store) => store.product);
  const product = products.find(
    (product) => Number(product?.id) === Number(id)
  );

  const dispatch = useDispatch();
  const history = useHistory();
  const [name, setName] = useState(product?.name ?? "");
  const [price, setPrice] = useState(product?.price ?? "");
  const [category, setCategory] = useState(product?.category ?? "");
  const [description, setDescription] = useState(product?.description ?? "");
  const [stockQuantity, setStockQuantity] = useState(
    product?.stock_quantity ?? ""
  );
  const [imageUrl, setImageUrl] = useState(product?.image_url || "");
  const [farm, setFarm] = useState(product?.farm || "");

  const handleSubmit = (event) => {
    event.preventDefault();
    const updateProduct = {
      name,
      price,
      category,
      description,
      stock_quantity: stockQuantity,
      farm,
      image_url: imageUrl,
    };
    console.log("the updated product", updateProduct);
    dispatch({
      type: "UPDATE_PRODUCT",
      payload: { id: id, data: updateProduct },
    });
    history.push("/product");
  };
  // const handleType = (event) => {
  //   console.log("type selection", event.target.id);
  //   setType(event.target.id);
  // };

  useEffect(() => {
    console.log("get the id from url");
  }, [id]);

  return (
    <Container>
      <h2 className="text-center my-4">Edit Product</h2>
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
              placeholder="Enter category"
              value={category}
              onChange={(event) => setCategory(event.target.value)}
              required
            />
          </Form.Group>

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
        <div className="d-flex justify-content-center">
          <Button variant="success" type="submit" className="mt-3">
            Update Product
          </Button>
        </div>
      </Form>
    </Container>
  );
}
export default ProductEditForm;
