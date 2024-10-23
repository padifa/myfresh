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
  //2. set local state to use the found product.
  const products = useSelector((store) => store.product);
  const product = products.find((product) => Number(product.id) === Number(id));

  const dispatch = useDispatch();
  const history = useHistory();
  const [name, setName] = useState(product.name ?? "");
  const [price, setPrice] = useState(product.price ?? "");
  const [category, setCategory] = useState(product.category ?? "");
  const [description, setDescription] = useState(product.description ?? "");
  const [stockQuantity, setStockQuantity] = useState(
    product.stock_quantity ?? ""
  );
  const [imageUrl, setImageUrl] = useState(product.image_url || "");
  // const [isFeatured, setIsFeatured] = useState("false");
  // const [type, setType] = useState("");
  //   const product = useSelector((store) => store.product);

  const handleSubmit = (event) => {
    event.preventDefault();
    const updateProduct = {
      name,
      price,
      category,
      description,
      stock_quantity: stockQuantity,
      // isFeatured,
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
      <Row className="justify-content-center">
        <Col md={8}>
          <h2 className="text-center my-4">Edit Product</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formProductName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter product name"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formProductPrice">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter price"
                value={price}
                onChange={(event) => setPrice(event.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formProductCategory">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter category"
                value={category}
                onChange={(event) => setCategory(event.target.value)}
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
              />
            </Form.Group>

            <Form.Group controlId="formStockQuantity">
              <Form.Label>Stock Quantity</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter stock quantity"
                value={stockQuantity}
                onChange={(event) => setStockQuantity(event.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formImageUrl">
              <Form.Label>Image URL</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter image URL"
                value={imageUrl}
                onChange={(event) => setImageUrl(event.target.value)}
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="mt-3">
              Update Product
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
export default ProductEditForm;
