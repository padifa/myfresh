import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useSelector } from "react-redux";
import { Button, Row, Col, Card } from "react-bootstrap";

// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name TemplateFunction with the name for the new component.
function ProductListItem({ product }) {
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'
  const [quantity, setQuantity] = useState(1);
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const history = useHistory();
  const viewDetails = (productId) => {
    console.log("navigate to product detail page", productId);

    history.push(`/details/${productId}`);
  };
  const addToCart = (product) => {
    console.log("add item to the cart", product);
    //product is one product item added to the cart
    const cartItem = { ...product };
    cartItem.quantity = quantity;

    dispatch({
      type: "ADD_TO_CART",
      payload: cartItem,
    });
  };

  const adjustQuantity = (amount) => {
    if (amount === "increase") {
      setQuantity(quantity + 1);
    } else if (amount === "decrease" && quantity > 1) {
      setQuantity(quantity - 1);
    } else {
      setQuantity(1);
    }
  };
  // const handleDelete = (productId) => {
  //   dispatch({
  //     type: "DELETE_PRODUCT",
  //     payload: productId,
  //   });
  // };

  // const handleEdit = (productId) => {
  //   history.push(`/edit/productForm/${productId}`);
  // };

  return (
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
          <Card.Subtitle>From {product.farm}</Card.Subtitle>
          <Card.Text>
            <strong>Category:</strong> {product.category}
            <br />
            <strong>Price:</strong> ${product.price}
            <br />
            {product.description}
            <br />
            <strong>Quantity:</strong> {quantity}
          </Card.Text>

          <div className="d-flex justify-content-between">
            <Button
              variant="success"
              size="sm"
              onClick={() => adjustQuantity("increase")}
              className="me-2"
            >
              +1
            </Button>

            <Button
              variant="secondary"
              size="sm"
              onClick={() => adjustQuantity("decrease")}
              className="me-2"
            >
              -1
            </Button>

            <Button
              variant="success"
              size="sm"
              onClick={() => addToCart(product)}
              className="me-2"
            >
              Add To Cart
            </Button>

            <Button
              variant="secondary"
              size="sm"
              onClick={() => viewDetails(product.id)}
              className="me-2"
            >
              View Details
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
}

export default ProductListItem;

{
  /* {user.role.toLowerCase() === "farmer" && (
            <div className="d-flex justify-content-between">
              <Button
                variant="primary"
                onClick={() => handleEdit(product.id)}
                className="me-2"
              >
                Edit
              </Button>
              <Button variant="danger" onClick={() => handleDelete(product.id)}>
                Remove
              </Button>
            </div>
          )} */
}
