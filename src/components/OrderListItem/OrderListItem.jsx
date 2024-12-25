import React, { useState } from "react"; // Import React and useState for state management
import { useDispatch } from "react-redux"; // Import useDispatch for dispatching Redux actions
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"; // Import useHistory for navigation
import moment from "moment"; // Import moment for date formatting
import { Button } from "react-bootstrap"; // Import Button component from React-Bootstrap

// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name TemplateFunction with the name for the new component.
function OrderListItem({ order }) {
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'
  console.log("the new order", order); // Log the order object for debugging purposes

  const [showProduct, setShowProduct] = useState(false); // Local state to toggle product visibility
  const history = useHistory(); // Hook to navigate programmatically
  const dispatch = useDispatch(); // Hook to dispatch actions to the Redux store

  // Toggle the visibility of product details
  const handleShowProducts = () => {
    setShowProduct(!showProduct); // Toggle the state of showProduct
  };

  // Handle the pay button click event
  const handlePay = (event, orderId) => {
    // Dispatch to the database a change to the
    // order that was selected by updating the 'order'
    // to have a status of 'paid'.
    if (event.target.name === "paid") {
      // If the button corresponds to a paid order, navigate to the receipt page
      history.push(`/receipt-page/${orderId}`);
    } else {
      // Otherwise, dispatch a PAYMENT action with the order ID as payload
      dispatch({ type: "PAYMENT", payload: orderId });
    }
  };

  return (
    <tr>
      {/* Display the order status */}
      <td>{order.status}</td>

      {/* Display the total amount of the order */}
      <td>${order.total_amount}</td>

      {/* Format and display the order creation date using moment */}
      <td>{moment(order.created_at).calendar()}</td>

      {/* Display the order option (e.g., delivery, pickup) */}
      <td>{order.option}</td>

      {/* Button to toggle the visibility of product details */}
      <td>
        <Button variant="success" onClick={handleShowProducts}>
          {showProduct ? "Hide Products" : "View Products"}
        </Button>
      </td>

      {/* Conditionally render the product details if showProduct is true */}
      {showProduct &&
        order.products.map((p) => (
          <td key={p.itemId}>{p.productName}</td> // Display each product name
        ))}

      {/* Button to handle payment or view receipt depending on the order status */}
      <td>
        <Button
          name={order.status === "paid" ? "paid" : "receipt"} // Set button name based on order status
          variant={order.status === "paid" ? "warning" : "success"} // Set button style based on order status
          onClick={(event) => handlePay(event, order.orderId)} // Handle button click
        >
          {order.status === "paid" ? "Receipt" : "Pay"}{" "}
          {/* Button text changes based on order status */}
        </Button>
      </td>
    </tr>
  );
}

export default OrderListItem; // Export the component for use in other parts of the app
