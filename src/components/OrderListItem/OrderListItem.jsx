import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name TemplateFunction with the name for the new component.
function OrderListItem({ order }) {
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'
  const [showProduct, setShowProduct] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();
  const handleShowProducts = () => {
    setShowProduct(!showProduct);
  };
  const handlePay = (orderId) => {
    //dispatch to the database a change to the
    //order that was selected. by UPDATE the 'order'
    // to have a status of 'paid'.
    dispatch({ type: "PAYMENT", payload: orderId });
    history.push(`/receipt-page/${orderId}`);
  };
  return (
    <tr>
      <td>{order.status}</td>
      <td>${order.total_amount}</td>
      <td>{order.created_at}</td>
      <td>{order.option}</td>
      <td>
        <button onClick={handleShowProducts}>
          {showProduct ? "Hide Products" : "View Products"}
        </button>
      </td>
      {showProduct &&
        order.products.map((p) => <td key={p.itemId}>{p.productName}</td>)}
      <td>
        <button onClick={() => handlePay(order.orderId)}>Pay</button>
      </td>
    </tr>
  );
}

export default OrderListItem;
