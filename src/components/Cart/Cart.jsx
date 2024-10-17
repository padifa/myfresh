import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function Cart() {
  const dispatch = useDispatch();
  const history = useHistory();
  const order = useSelector((store) => store.product);
  const products = useSelector((store) => store.product);
  const customer = useSelector((store) => store.product);
  const foundProducts = order.map((productOrder) =>
    products.find((prod) => prod.id === productOrder.id)
  );

  const totalCost = foundProducts
    .reduce((total, product) => total + parseFloat(product?.price || 0), 0)
    .toFixed(2);

  const handleCart = () => {
    const newOrder = {
      ...customer,
      products: order,
      total: totalCost,
    };
    dispatch({ type: "SUBMIT_CART", payload: newOrder });
    history.push("/");
  };

  const handleType = (event) => {
    console.log("type selection", event.target.id);
    setType(event.target.id);
  };
  return (
    <>
      <div className="customer-info" style={{ backgroundColor: "#11ee52" }}>
        <h2>Order List</h2>
        {JSON.stringify(products)}
        <ul>
          <li>Username: {customer.username}</li>
          <li>Phone Number: {customer.phone_number}</li>
          <li>E_mail: {customer.email}</li>
          <li>Address: {customer.address}</li>
          <li>City: {customer.city}</li>
          <li>Country: {customer.country}</li>
          <li>Zip: {customer.zip}</li>
        </ul>
      </div>
      <div className="cart_container">
        <h2>Cart</h2>
        <table className="cart_table">
          <thead>
            <tr>
              <th>Product</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {foundProducts.map((item, index) => (
              <tr key={index}>
                <td>{item?.name}</td>
                <td>${item?.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <label>Total:</label>
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
