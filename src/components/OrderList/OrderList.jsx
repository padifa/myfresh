import React from "react"; // Import React for component creation
import { Container, Table } from "react-bootstrap"; // Import Bootstrap components for styling
import OrderListItem from "../OrderListItem/OrderListItem"; // Import the child component to render individual orders

// OrderList functional component to display a list of orders in a table
function OrderList({ orders }) {
  // Log all orders to the console for debugging purposes
  console.log("all the orders", orders);

  return (
    // Use Bootstrap's Container component for responsive layout
    <Container fluid>
      {/* Make the table horizontally scrollable for better UX on smaller screens */}
      <div style={{ overflowX: "auto" }}>
        {/* Render a responsive, striped, bordered, and hoverable table */}
        <Table striped bordered hover responsive>
          {/* Table header defining column titles */}
          <thead>
            <tr>
              <th>Status</th> {/* Column for the order's status */}
              <th>Total Amount</th> {/* Column for the order's total amount */}
              <th>Created</th> {/* Column for the order's creation date */}
              <th>Option</th> {/* Column for any additional options */}
            </tr>
          </thead>
          {/* Table body to dynamically render rows based on orders */}
          <tbody>
            {/* Map through the orders array and render each order using the OrderListItem component */}
            {orders.map((order) => (
              <OrderListItem key={order.orderId} order={order} />
            ))}
          </tbody>
        </Table>
      </div>
    </Container>
  );
}

export default OrderList; // Export the component for use in other parts of the application

{
  /* 
  The commented code below demonstrates an alternative way of rendering the orders
  as an unordered list instead of a table. It is left here for reference or potential use.
  */
}
{
  /* <ul>
        {orders.map((order) => (
          <OrderListItem order={order} />
        ))}
      </ul> */
}
