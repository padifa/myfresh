import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import ProductListItem from "../ProductListItem/ProductListItem";
import { Button, Table, Container, Row, Col } from "react-bootstrap";
// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name TemplateFunction with the name for the new component.
function ProductList(props) {
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'
  const products = useSelector((store) => store.product);
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  useEffect(() => {
    dispatch({
      type: "FETCH_PRODUCT",
    });
  }, [dispatch]);
  const goToCart = () => {
    history.push(`/cart`);
  };
  const addProduct = (event) => {
    console.log("add new product");
    history.push(`/productForm`);
  };

  return (
    <Container className="mt-5">
      <Row className="mb-3">
        <Col className="d-flex justify-content-between">
          <Button variant="primary" onClick={goToCart}>
            Go To Cart
          </Button>
          {user.role === "farmer" && (
            <Button variant="success" onClick={addProduct}>
              Add Product
            </Button>
          )}
        </Col>
      </Row>

      {products && products.length > 0 ? (
        <Table striped bordered hover responsive className="product_table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Image</th>
              <th colSpan="5">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <ProductListItem key={product.id} product={product} />
            ))}
          </tbody>
        </Table>
      ) : (
        <p>No products found</p>
      )}
    </Container>
  );
}

export default ProductList;
