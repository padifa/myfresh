import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name TemplateFunction with the name for the new component.

// Functional component to display an individual cart item
function CartListItem({ item }) {
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'

  const dispatch = useDispatch(); // Hook to dispatch actions to Redux store

  console.log("product item", item); // Debug log to check the item passed as props

  // Function to handle the removal of an item from the cart
  const handleDelete = (itemId) => {
    // Dispatch an action to remove the product from the cart
    dispatch({ type: "REMOVE_PRODUCT_FROM_CART", payload: itemId });
  };

  return (
    <tr>
      {/* Displaying product details in table cells */}
      <td>{item?.name}</td> {/* Product name */}
      <td>{item?.price}</td> {/* Product price */}
      <td>{item?.quantity}</td> {/* Quantity of product in the cart */}
      <td>${item?.price * item?.quantity}</td> {/* Total price for this item */}
      <td>
        {/* Button to remove the item, styled with Bootstrap */}
        <Button variant="danger" onClick={() => handleDelete(item?.id)}>
          Remove
        </Button>
      </td>
    </tr>
  );
}

export default CartListItem;

/*
Summary of the Component:
1. `CartListItem` is a functional component that represents a single row in a shopping cart table.
2. It receives `item` as a prop, which contains the product details (name, price, quantity, etc.).
3. The `handleDelete` function dispatches a Redux action to remove the item from the cart.
4. Bootstrap is used for styling the "Remove" button with a red (danger) variant.
5. The component is designed to be reusable for any cart item passed to it as a prop.
6. The `console.log` helps during development to confirm the data being passed to this component.
*/
