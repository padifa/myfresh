import React, { useState } from "react";
import { useSelector } from "react-redux";
import OrderListItem from "../OrderListItem/OrderListItem";
// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name TemplateFunction with the name for the new component.
function OrderList({ orders }) {
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'
  console.log("all the orders", orders);

  return (
    <table>
      <thead>
        <tr>
          <th>Status</th>
          <th>Total Amount</th>
          <th>Created</th>
          <th>Option</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {orders.map((order) => (
          <OrderListItem key={order.orderId} order={order} />
        ))}
      </tbody>
    </table>
  );
}

export default OrderList;

{
  /* <ul>
        {orders.map((order) => (
          <OrderListItem order={order} />
        ))}
      </ul> */
}
