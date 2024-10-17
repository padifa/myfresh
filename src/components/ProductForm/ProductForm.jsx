import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
function ProductForm({ addNewProduct }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [stockQuantity, setStockQuantity] = useState("");
  const [isFeatured, setIsFeatured] = useState("");
  const [createdAt, setCreatedAt] = useState("");
  const [updatedAt, setUpdatedAt] = useState("");
  const [type, setType] = useState("");
  //   const product = useSelector((store) => store.product);
  const addProduct = (event) => {
    event.preventDefault();
    useEffect(() => {
      dispatch({
        type: "FORM_INPUT",
      });
      history.push("/product");
    });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const orderData = {
      name,
      price,
      category,
      description,
      stockQuantity,
      isFeatured,
      createdAt,
      updatedAt,
      type,
    };
    console.log("the order", orderData);
    dispatch({ type: "CUSTOMER_ORDER", payload: orderData });
    history.push("/product");
  };
  const handleType = (event) => {
    console.log("type selection", event.target.id);
    setType(event.target.id);
  };
  return (
    <div>
      <form onSubmit={addProduct}>
        <label>Name</label>
        <br />
        <input
          name="name"
          type="text"
          placeholder="Name"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
        <br />
        <label>Price</label>
        <br />
        <input
          type="text"
          name="price"
          placeholder="price"
          value={price}
          onChange={(event) => setPrice(event.target.value)}
        />
        <br />
        <label>Category</label>
        <br />
        <input
          type="text"
          name="category"
          placeholder="category"
          required
          value={category}
          onChange={(event) => setCategory(event.target.value)}
        />
        <br />
        <label>Description</label>
        <br />
        <input
          type="text"
          name="description"
          placeholder="description"
          required
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />
        <br />
        <label>Stock Quantity</label>
        <br />
        <input
          type="text"
          name="stockQuantity"
          placeholder="Stock Quantity"
          required
          value={stockQuantity}
          onChange={(event) => setStockQuantity(event.target.value)}
        />
        <br />
        <label>Created at</label>
        <br />
        <input
          type="text"
          name="createdAt"
          placeholder="Created At"
          required
          value={createdAt}
          onChange={(event) => setCreatedAt(event.target.value)}
        />
        <br />
        <label>Updated at</label>
        <br />
        <input
          type="text"
          name="updatedAt"
          placeholder="Updated At"
          required
          value={updatedAt}
          onChange={(event) => setUpdatedAt(event.target.value)}
        />
        <br />
        <label>Is featured</label>
        <br />
        <input
          type="text"
          name="isFeatured"
          placeholder="Is Featured"
          required
          value={isFeatured}
          onChange={(event) => setIsFeatured(event.target.value)}
        />

        <button type="submit" onClick={handleSubmit}>
          Add New Product
        </button>
      </form>
    </div>
  );
}
export default ProductForm;
