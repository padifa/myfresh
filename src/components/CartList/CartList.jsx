import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import CartListItem from "../CartListItem/CartListItem";
import { Container, Table, Button } from "react-bootstrap";
function CartList() {
  const dispatch = useDispatch();
  const history = useHistory();
  const cart = useSelector((store) => store.cart);
  console.log("items in my cart", cart);

  const [type, setType] = useState("");

  const totalCost = cart
    .reduce(
      (total, product) =>
        total +
        parseFloat(Number(product?.price) * Number(product?.quantity) || 0),
      0
    )
    .toFixed(2);

  const handleCart = () => {
    console.log("total amount", totalCost);
    const newOrder = {
      products: cart,
      total_amount: totalCost,
      status: "pending",
      option: type,
    };

    console.log("my new order", newOrder);
    dispatch({ type: "ADD_ORDER", payload: newOrder });
    dispatch({ type: "UNSET_CART" });
    history.push("/order");
  };

  const handleType = (event) => {
    console.log("type selection", event.target.id);
    setType(event.target.id);
  };
  useEffect(() => {
    console.log("the cart", cart.length);
  }, []);

  return (
    <>
      <Container>
        <div
          className="customer-info"
          style={{ backgroundColor: "#11ee52", padding: "10px" }}
        >
          <h2>Cart</h2>
        </div>
        <div className="cart_container">
          <Table striped bordered hover className="cart_table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Price x Quantity</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {cart?.map((item) => (
                <CartListItem key={item.id} item={item} />
              ))}
            </tbody>
          </Table>
          <hr />
          <label>Total: ${totalCost}</label>
          <br />
          <Button
            variant="primary"
            id="delivery"
            onClick={handleType}
            style={{ marginRight: "10px" }}
          >
            Delivery
          </Button>
          <Button
            variant="primary"
            id="pickup"
            onClick={handleType}
            style={{ marginRight: "10px" }}
          >
            Pickup
          </Button>
          <Button variant="success" onClick={handleCart}>
            Checkout
          </Button>
        </div>
      </Container>
    </>
  );
}

export default CartList;
