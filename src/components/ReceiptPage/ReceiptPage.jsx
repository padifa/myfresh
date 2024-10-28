import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
// import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useEffect } from "react";

import { Container, Table, Card, Button } from "react-bootstrap";
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

  console.log("Order", order);
  console.log("my receipt for order:", orderId);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({
      type: "FETCH_ORDER",
    });
  }, [dispatch]);
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
      <Container style={{ marginTop: "2rem" }}>
        <Card className="text-center">
          <Card.Header as="h1">Order: #{orderId}</Card.Header>
          <Card.Body>
            <Card.Title>Here is your receipt</Card.Title>
            <Table striped bordered hover responsive>
              <thead>
                <tr>
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
        <Link to="/order" className="d-inline-block mt-3">
          <Button variant="success" type="button" className="mt-3">
            Back
          </Button>
        </Link>
      </Container>
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
