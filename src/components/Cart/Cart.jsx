import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function Cart() {
  const dispatch = useDispatch();
  const history = useHistory();
  const cart = useSelector((store) => store.cart);
  console.log("items in my cart", cart);
  const [type, setType] = useState("");

  const totalCost = cart
    .reduce((total, product) => total + parseFloat(product?.price || 0), 0)
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
    history.push("/");
  };

  const handleType = (event) => {
    console.log("type selection", event.target.id);
    setType(event.target.id);
  };
  const handleDelete = (id) => {
    dispatch({ type: "REMOVE_PRODUCT_FROM_CART", payload: id });
  };

  return (
    <>
      <div className="customer-info" style={{ backgroundColor: "#11ee52" }}>
        <h2>Cart</h2>
      </div>
      <div className="cart_container">
        <table className="cart_table">
          <thead>
            <tr>
              <th>Product</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item, index) => (
              <tr key={index}>
                <td>{item?.name}</td>
                <td>${item?.price}</td>
                <td>
                  <button
                    onClick={() => handleDelete(item?.id)}
                    style={{ backgroundColor: "red", color: "white" }}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <hr />
        <label>Total: ${totalCost}</label>
        <br />
        <button type="button" id="delivery" onClick={handleType}>
          Delivery
        </button>
        <button type="button" id="pickup" onClick={handleType}>
          Pickup
        </button>

        <button onClick={handleCart}>Checkout</button>
      </div>
    </>
  );
}

export default Cart;
