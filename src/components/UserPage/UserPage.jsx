import React from "react";
import LogOutButton from "../LogOutButton/LogOutButton";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import { useDispatch } from "react-redux";
import { Container, Button, ListGroup, Row, Col } from "react-bootstrap";
function UserPage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  const products = useSelector((store) => store.product);
  const history = useHistory();
  const dispatch = useDispatch();
  console.log("products", products);
  const myProducts = products.filter(
    (product) => Number(product.user_id) === Number(user.id)
  );
  console.log("My products", myProducts);

  const handleEdit = (productId) => {
    history.push(`/edit/productForm/${productId}`);
    console.log("edit this product", productId);
  };
  const handleDelete = (productId) => {
    dispatch({
      type: "DELETE_PRODUCT",
      payload: productId,
    });
  };
  const addProduct = (event) => {
    console.log("add new product");
    history.push(`/productForm`);
  };
  return (
    <Container className="mt-5">
      <h2 className="mb-4">Welcome, {user.username}!</h2>
      {user.role === "farmer" && (
        <Button variant="success" onClick={addProduct} className="mb-3">
          Add Product
        </Button>
      )}
      <p>Your ID is: {user.id}</p>

      <ListGroup>
        {myProducts?.map((product) => (
          <ListGroup.Item key={product.id}>
            <Row>
              <Col xs={8}>
                <h5>{product.name}</h5>
                <p>
                  Category: {product.category} | Price: ${product.price}
                  <br />
                  {product.description}
                </p>
              </Col>
              <Col
                xs={4}
                className="d-flex justify-content-end align-items-center"
              >
                <Button
                  variant="primary"
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
              </Col>
            </Row>
          </ListGroup.Item>
        ))}
      </ListGroup>

      <LogOutButton className="btn mt-4" />
    </Container>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
