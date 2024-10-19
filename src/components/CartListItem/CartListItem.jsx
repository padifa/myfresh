import React, { useState } from "react";

import { useDispatch } from "react-redux";
// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name TemplateFunction with the name for the new component.
function CartListItem({ item }) {
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'
  const dispatch = useDispatch();
  console.log("product item", item);
  const handleDelete = (itemId) => {
    dispatch({ type: "REMOVE_PRODUCT_FROM_CART", payload: itemId });
  };

  return (
    <tr>
      <td>{item?.name}</td>
      <td>${item?.price * item?.quantity}</td>
      <td>
        <button
          onClick={() => handleDelete(item?.id)}
          style={{ backgroundColor: "red", color: "white" }}
        >
          Remove
        </button>
      </td>
    </tr>
  );
}

export default CartListItem;