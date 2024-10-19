import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function CartList() {
  const dispatch = useDispatch();
  const history = useHistory();
  const cart = useSelector((store) => store.cart);
  console.log("items in my cart", cart);
  const [type, setType] = useState("");
  const [quantity, setQuantity] = useState(1);

  const handleProductTotal = (price) => {
    //product price *
    return price * quantity;
  };
  const totalCost = cart
    .reduce(
      (total, product) =>
        total + parseFloat(handleProductTotal(product?.price) || 0),
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
    // dispatch({ type: "ADD_ORDER", payload: newOrder });
    // dispatch({ type: "UNSET_CART" });
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
              <th>Price x Quantity</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item) => (
              <tr key={index}>
                <td>{item?.name}</td>
                <td>${item?.price} x </td>
                <td>
                  <input value="1" type="number" />
                </td>
                <td>${item.price}</td>
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
        <label>Total Order: ${totalCost}</label>
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

export default CartList;
