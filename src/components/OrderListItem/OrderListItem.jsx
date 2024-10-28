import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import moment from "moment";
import { Button } from "react-bootstrap";
// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name TemplateFunction with the name for the new component.
function OrderListItem({ order }) {
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'
  console.log("the new order", order);
  const [showProduct, setShowProduct] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();
  const handleShowProducts = () => {
    setShowProduct(!showProduct);
  };
  const handlePay = (event, orderId) => {
    //dispatch to the database a change to the
    //order that was selected. by UPDATE the 'order'
    // to have a status of 'paid'.
    if (event.target.name === "paid") {
      history.push(`/receipt-page/${orderId}`);
    } else {
      dispatch({ type: "PAYMENT", payload: orderId });
    }
  };
  return (
    <tr>
      <td>{order.status}</td>
      <td>${order.total_amount}</td>
      <td>{moment(order.created_at).calendar()}</td>
      <td>{order.option}</td>
      <td>
        <Button variant="success" onClick={handleShowProducts}>
          {showProduct ? "Hide Products" : "View Products"}
        </Button>
      </td>
      {showProduct &&
        order.products.map((p) => <td key={p.itemId}>{p.productName}</td>)}

      <td>
        <Button
          name={order.status === "paid" ? "paid" : "receipt"}
          variant={order.status === "paid" ? "warning" : "success"}
          onClick={(event) => handlePay(event, order.orderId)}
        >
          {order.status === "paid" ? "Receipt" : "Pay"}
        </Button>
      </td>
    </tr>
  );
}

export default OrderListItem;
