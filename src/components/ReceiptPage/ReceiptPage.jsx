import React, { useState } from "react";
import { useParams } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useEffect } from "react";

import { Container, Table, Button } from "react-bootstrap";
// import ReceiptListItem from "./ReceiptListItem";
// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name TemplateFunction with the name for the new component.
function ReceiptPage() {
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'
  const { orderId } = useParams();
  const orders = useSelector((store) => store.order);
  const order = orders.find(
    (order) => Number(order.orderId) === Number(orderId)
  );
  console.log("my receipt for order:", orderId);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({
      type: "FETCH_ORDER",
    });
  }, []);
  //   const totalCost = cart
  //     .reduce(
  //       (total, product) =>
  //         total +
  //         parseFloat(Number(product?.price) * Number(product?.quantity) || 0),
  //       0
  //     )
  //     .toFixed(2);

  //   const handleReceipt = () => {
  //     console.log("total amount", totalCost);
  //     const newOrder = {
  //       products: cart,
  //       total_amount: totalCost,
  //       status: "Purchased",
  //       option: type,
  //       quantity,
  //       price,
  //     };

  //     console.log("my new order", newOrder);
  //     dispatch({ type: "ADD_ORDER", payload: newOrder });
  //     dispatch({ type: "UNSET_CART" });
  //     history.push("/order");
  //   };

  //   useEffect(() => {
  //     console.log("the receipt", cart.length);
  //   }, []);

  return (
    <>
      <h1>Order Id: {orderId}</h1>
      <tr>
        <td>{order.status}</td>
        <td>${order.total_amount}</td>
        <td>{order.created_at}</td>
        <td>{order.option}</td>
        <td>
          {order.products.map((o) => (
            <p>{o.productName}</p>
          ))}
        </td>
      </tr>
    </>
    //   /* <td> */</td>
    // <>
    //   <Container>
    //     <div
    //       className="customer-info"
    //       style={{ backgroundColor: "#11ee52", padding: "10px" }}
    //     >
    //       <h2>Your Receipt</h2>
    //     </div>
    //     <div className="cart_container">
    //       <Table striped bordered hover className="cart_table">
    //         <thead>
    //           <tr>
    //             <th>Product</th>
    //             <th>Quantity</th>
    //             <th>Price </th>
    //             <th>Total</th>
    //             <th></th>
    //           </tr>
    //         </thead>
    //         <tbody>
    //           {/* {order?.map((item) => (
    //             <th key={item.id} item={item}></th>
    //           ))} */}
    //           <tr>
    //             <td>{order?.status}</td>
    //             <td>${order?.total_amount}</td>
    //             <td>{order?.created_at}</td>
    //             <td>{order?.option}</td>
    //           </tr>
    //         </tbody>
    //       </Table>
    //       <hr />
    //       <label>Total: ${totalCost}</label>
    //       <br />

    //       <Button variant="success" onClick={handleReceipt}>
    //         Print
    //       </Button>
    //     </div>
    //   </Container>
    // </>
  );
}

export default ReceiptPage;
