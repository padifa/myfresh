import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import OrderList from "../OrderList/OrderList";
// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name TemplateFunction with the name for the new component.
function OrderPage(props) {
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'
  const orders = useSelector((store) => store.order);
  const [order, setOrder] = useState("All the orders");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({
      type: "FETCH_ORDER",
    });
  }, []);

  return (
    <>
      <div>
        <h2>Order Page</h2>

        <OrderList orders={orders} />
      </div>
      <div></div>
    </>
  );
}

export default OrderPage;
