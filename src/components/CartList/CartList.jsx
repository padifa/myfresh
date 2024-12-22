import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"; // Redux hooks for dispatching actions and selecting state
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"; // React Router for navigation
import CartListItem from "../CartListItem/CartListItem"; // Component to render individual cart items
import { Container, Table, Button } from "react-bootstrap"; // Bootstrap components for UI styling

// Functional component to display the shopping cart
function CartList() {
  const dispatch = useDispatch(); // Hook to dispatch Redux actions
  const history = useHistory(); // Hook to navigate between pages
  const cart = useSelector((store) => store.cart); // Selecting cart data from the Redux store
  const user = useSelector((store) => store.user); // Selecting user data from the Redux store
  console.log("items in my cart", cart); // Debugging the cart content

  const [type, setType] = useState(""); // Local state to store the order type (delivery/pickup)

  // Calculate the total cost of items in the cart
  const totalCost = cart
    .reduce(
      (total, product) =>
        total +
        parseFloat(Number(product?.price) * Number(product?.quantity) || 0),
      0
    )
    .toFixed(2);

  // Function to handle placing the order
  const handleCart = () => {
    console.log("total amount", totalCost); // Debugging the total cost
    const newOrder = {
      products: cart, // Items in the cart
      total_amount: totalCost, // Total cost of the order
      status: "pending", // Default order status
      option: type, // Delivery or pickup option
    };

    console.log("my new order", newOrder); // Debugging the new order object
    dispatch({ type: "ADD_ORDER", payload: newOrder }); // Dispatch action to add the order
    dispatch({ type: "UNSET_CART" }); // Dispatch action to clear the cart
    history.push("/order"); // Navigate to the order page
  };

  // Function to handle setting the order type
  const handleType = (event) => {
    console.log("type selection", event.target.id); // Debugging the selected type
    setType(event.target.id); // Update the order type in state
  };

  // Effect to log cart length when the component is mounted or cart changes
  useEffect(() => {
    console.log("the cart", cart.length);
  }, [cart]);

  return (
    <>
      {user.username} {/* Display the username */}
      <Container>
        {/* Header section for the cart */}
        <div
          className="customer-info"
          style={{ backgroundColor: "success", padding: "10px" }}
        >
          <h2>Cart</h2>
        </div>
        {/* Main cart table */}
        <div className="cart_container">
          <Table striped bordered hover className="cart_table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Unit Price </th>
                <th>Quantity</th>
                <th>Total Price</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {/* Map through the cart items and render each one using CartListItem */}
              {cart?.map((item) => (
                <CartListItem key={item.id} item={item} />
              ))}
            </tbody>
          </Table>
          <hr />
          {/* Buttons for selecting delivery or pickup and placing the order */}
          <Button
            variant="success"
            id="delivery"
            onClick={handleType}
            style={{ marginRight: "10px" }}
          >
            Delivery
          </Button>
          <Button
            variant="secondary"
            id="pickup"
            onClick={handleType}
            style={{ marginRight: "10px" }}
          >
            Pickup
          </Button>
          <Button variant="success" onClick={handleCart}>
            Place Order
          </Button>
          {/* Display total cost */}
          <label style={{ marginLeft: "27em" }}>
            <h2>Total: ${totalCost}</h2>
          </label>
          <br />
        </div>
      </Container>
    </>
  );
}

export default CartList;

/*
Summary of the Component:
1. The `CartList` component displays the user's shopping cart items.
2. It calculates the total cost of items in the cart and allows the user to place an order.
3. The user can choose between "Delivery" and "Pickup" options.
4. Dispatches Redux actions to handle adding an order and clearing the cart.
5. The `CartListItem` component is used for rendering each cart item.
6. Bootstrap is used for styling the layout and buttons.
7. The `useEffect` hook is used to log the cart length when the cart changes.
*/
