import React, { useState } from "react";
import { useParams, Link } from "react-router-dom"; // Import hooks and components for routing.

import { useDispatch, useSelector } from "react-redux"; // Import hooks for interacting with Redux store.
// import { useHistory } from "react-router-dom/cjs/react-router-dom.min"; // Commented out, not currently in use.
import { useEffect } from "react";

import { Container, Table, Card, Button } from "react-bootstrap"; // Import Bootstrap components for styling.
// import ReceiptListItem from "./ReceiptListItem"; // Commented out, not currently in use.

// Functional component for displaying a receipt page.
function ReceiptPage() {
  // Extract the orderId parameter from the URL using useParams.
  const { orderId } = useParams();

  // Select the orders data from the Redux store.
  const orders = useSelector((store) => store.order);

  // Find the specific order that matches the orderId.
  const order = orders.find(
    (order) => Number(order.orderId) === Number(orderId)
  );

  // Log the selected order and orderId for debugging.
  console.log("Order", order);
  console.log("my receipt for order:", orderId);

  const dispatch = useDispatch(); // Get the dispatch function to send actions to Redux.
  useEffect(() => {
    // Dispatch an action to fetch orders when the component mounts.
    dispatch({
      type: "FETCH_ORDER",
    });
  }, [dispatch]);

  // Code for calculating the total cost is commented out, as it is not used in the current implementation.
  // const totalCost = cart
  //   .reduce(
  //     (total, product) =>
  //       total +
  //       parseFloat(Number(product?.price) * Number(product?.quantity) || 0),
  //     0
  //   )
  //   .toFixed(2);

  // Handle receipt-related actions (currently commented out).
  // const handleReceipt = () => {
  //   console.log("total amount", totalCost);
  //   const newOrder = {
  //     products: cart,
  //     total_amount: totalCost,
  //     status: "Purchased",
  //     option: type,
  //     quantity,
  //     price,
  //   };
  //   console.log("my new order", newOrder);
  //   dispatch({ type: "ADD_ORDER", payload: newOrder });
  //   dispatch({ type: "UNSET_CART" });
  //   history.push("/order");
  // };

  // Debugging log for receipt data (currently commented out).
  // useEffect(() => {
  //   console.log("the receipt", cart.length);
  // }, []);

  return (
    <>
      <Container style={{ marginTop: "2rem" }}>
        <Card className="text-center">
          {/* Display the order ID in the card header */}
          <Card.Header as="h1">Order: #{orderId}</Card.Header>
          <Card.Body>
            <Card.Title>Here is your receipt</Card.Title>
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  {/* Table headers for the receipt */}
                  <th>Products</th>
                  <th>Quantity</th>
                  <th>Unit price</th>
                  <th>Option</th>
                  <th>Date</th>
                  <th>Total Amount</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {/* Render each product in the order */}
                {order?.products.map((product, index) => (
                  <tr key={index}>
                    <td>{product?.productName}</td>
                    <td>{product?.quantity}</td>
                    <td>{product?.price}</td>
                    <td>{order?.option}</td>
                    <td>{new Date(order?.created_at).toLocaleDateString()}</td>
                    <td>${order?.total_amount}</td>
                    <td>{order?.status}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      </Container>
      <Container style={{ marginTop: "2rem" }}>
        {/* Link to navigate back to the orders page */}
        <Link to="/order" className="d-inline-block mt-3">
          <Button variant="success" type="button" className="mt-3">
            Back
          </Button>
        </Link>
      </Container>
    </>
    // The following code is commented out, as it is not part of the current implementation.
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

export default ReceiptPage; // Export the component for use in other parts of the application.
