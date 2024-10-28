import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { Card, Container, Col, Row, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import moment from "moment";
function ProductDetails(props) {
  const { id } = useParams();
  console.log("my product id", id);

  const products = useSelector((store) => store.product);
  const user = useSelector((store) => store.user);
  const history = useHistory();
  const dispatch = useDispatch();
  const product = products.find((product) => Number(product.id) === Number(id));
  const [details, setDetails] = useState("Product Details");
  // const handleClick = () => {
  //   history.push(`/`);
  // };
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
    history.push("/product");
  };

  return (
    <>
      <Card>
        <h3 className="text-center mt-4" style={{ marginRight: "500px" }}>
          <strong>{user.username} </strong>
        </h3>
      </Card>
      <div className="bg-white" style={{ padding: "20px" }}>
        <Container>
          {user.role.toLowerCase() === "farmer" && (
            <div className="mb-3">
              <Button
                variant="secondary"
                onClick={() => handleEdit(product.id)}
              >
                Edit
              </Button>{" "}
              <Button variant="danger" onClick={() => handleDelete(product.id)}>
                Remove
              </Button>
            </div>
          )}

          {product?.id ? (
            <>
              <Row className="justify-content-center mb-4">
                <Col xs={12} md={8}>
                  <h1 className="text-center">{product.name}</h1>
                  <img
                    src={product.image_url}
                    alt={product.name}
                    className="img-fluid mb-4"
                  />
                  <Card
                    className="shadow-sm mb-4"
                    style={{ backgroundColor: "#16A842" }}
                  >
                    <Card.Body className="d-flex flex-column justify-content-between">
                      <Card.Text
                        className="lead text-dark"
                        style={{
                          color: "white",
                          fontSize: "1.1rem",
                          lineHeight: "1.5",
                        }}
                      >
                        {product.description}
                        <br />
                        <strong>Category:</strong> {product.category}
                        <br />
                        <strong>Stock Quantity:</strong>{" "}
                        {product.stock_quantity}
                        <br />
                        <strong>Created:</strong>{" "}
                        {moment(product.created_at).calendar()}
                        <br />
                        <strong>Updated:</strong>{" "}
                        {moment(product.updated_at).calendar()}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </>
          ) : (
            <p className="text-center">Product not found</p>
          )}
        </Container>
      </div>
    </>
  );
}

export default ProductDetails;
