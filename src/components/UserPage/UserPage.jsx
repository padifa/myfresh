import React from "react";
import LogOutButton from "../LogOutButton/LogOutButton";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import { useDispatch } from "react-redux";
function UserPage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  const products = useSelector((store) => store.product);
  const history = useHistory();
  const dispatch = useDispatch();
  console.log("products", products);
  const myProducts = products.filter(
    (product) => Number(product.user_id) === Number(user.id)
  );
  console.log("My products", myProducts);

  const handleEdit = (productId) => {
    history.push(`/edit/productForm/${productId}`);
    console.log("edit this product", productId);
  };
  const handleDelete = (productId) => {
    dispatch({
      type: "DELETE_PRODUCT",
      payload: productId,
    });
  };
  const addProduct = (event) => {
    console.log("add new product");
    history.push(`/productForm`);
  };
  return (
    <div className="container">
      <h2>Welcome, {user.username}!</h2>
      {user.role === "farmer" && (
        <button onClick={addProduct}>Add Product</button>
      )}
      <p>Your ID is: {user.id}</p>
      <ul>
        {myProducts?.map((product) => (
          <li key={product.id}>
            {product.name} {product.category} {product.price}{" "}
            {product.description}
            <button onClick={() => handleEdit(product.id)}> Edit</button>{" "}
            <button
              onClick={() => handleDelete(product.id)}
              style={{ backgroundColor: "red", color: "white" }}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>

      <LogOutButton className="btn" />
    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
