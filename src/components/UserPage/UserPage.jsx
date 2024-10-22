import React from "react";
import LogOutButton from "../LogOutButton/LogOutButton";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import { useDispatch } from "react-redux";
import { Container, Button, Row, Col, Card } from "react-bootstrap";
import ProductList from "../ProductList/ProductList";
function UserPage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM

  const user = useSelector((store) => store.user);
  const products = useSelector((store) => store.product);
  const history = useHistory();
  const dispatch = useDispatch();

  const myProducts = products.filter(
    (product) => Number(product.user_id) === Number(user.id)
  );

  const handleEdit = (productId) => {
    history.push(`/edit/productForm/${productId}`);
  };

  const handleDelete = (productId) => {
    dispatch({
      type: "DELETE_PRODUCT",
      payload: productId,
    });
  };

  const addProduct = () => {
    history.push(`/productForm`);
  };

  return (
    <Container className="mt-5">
      <h2 className="mb-4">Welcome, {user.username}!</h2>

      {user.role === "farmer" ? (
        <>
          <Button variant="success" onClick={addProduct} className="mb-3">
            Add Product
          </Button>
          <Row>
            {myProducts?.map((product) => (
              <Col md={4} sm={6} xs={12} className="mb-4" key={product.id}>
                <Card>
                  <Card.Img
                    variant="top"
                    src={product.image_url || "public/Images/apple.jpeg"}
                    alt={product.name}
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                  <Card.Body>
                    <Card.Title>{product.name}</Card.Title>
                    <Card.Text>
                      <strong>Category:</strong> {product.category}
                      <br />
                      <strong>Price:</strong> ${product.price}
                      <br />
                      {product.description}
                    </Card.Text>
                    <div className="d-flex justify-content-between">
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
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </>
      ) : (
        <ProductList />
      )}

      <LogOutButton className="btn mt-4" />
    </Container>
  );
}

export default UserPage;
