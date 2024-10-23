import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import ProductListItem from "../ProductListItem/ProductListItem";
import { Button, Container, Row, Col, Card } from "react-bootstrap";

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

  const myProducts = products.filter(
    (product) => Number(product.user_id) === Number(user.id)
  );

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
        </Col>
      </Row>

      <Row>
        {products.map((product) => (
          <ProductListItem key={product.id} product={product} />
        ))}
      </Row>
    </Container>
  );
}

export default ProductList;

/*
 <Container className="mt-5">
      <Row className="mb-3">
        <Col className="d-flex justify-content-between">
          <Button variant="primary" onClick={goToCart}>
            Go To Cart
          </Button>
        </Col>
      </Row>

      {user.role.toLowerCase() === "farmer" ? (
        <>
          <Button variant="success" onClick={addProduct} className="mb-3">
            Add Product
          </Button>
          <Row>
            {myProducts?.map((product) => (
              <ProductListItem key={product.id} product={product} />
            ))}
          </Row>
        </>
      ) : (
        <Row>
          {products.map((product) => (
            <ProductListItem key={product.id} product={product} />
          ))}
        </Row>
      )}
    </Container>
*/
