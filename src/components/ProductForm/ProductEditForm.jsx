import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
function ProductEditForm() {
  const { id } = useParams();
  console.log("MY PRODUCT ID", id);

  //1. find the product in the redux store with the id that matches the 'id' from useParams.
  //2. set local state to use the found product.
  const products = useSelector((store) => store.product);
  const product = products.find((product) => Number(product.id) === Number(id));

  const dispatch = useDispatch();
  const history = useHistory();
  const [name, setName] = useState(product.name ?? "");
  const [price, setPrice] = useState(product.price ?? "");
  const [category, setCategory] = useState(product.category ?? "");
  const [description, setDescription] = useState(product.description ?? "");
  const [stockQuantity, setStockQuantity] = useState(
    product.stock_quantity ?? ""
  );
  const [imageUrl, setImageUrl] = useState(product.image_url || "");
  // const [isFeatured, setIsFeatured] = useState("false");
  // const [type, setType] = useState("");
  //   const product = useSelector((store) => store.product);

  const handleSubmit = (event) => {
    event.preventDefault();
    const updateProduct = {
      name,
      price,
      category,
      description,
      stock_quantity: stockQuantity,
      // isFeatured,
      image_url: imageUrl,
    };
    console.log("the updated product", updateProduct);
    dispatch({
      type: "UPDATE_PRODUCT",
      payload: { id: id, data: updateProduct },
    });
    history.push("/product");
  };
  // const handleType = (event) => {
  //   console.log("type selection", event.target.id);
  //   setType(event.target.id);
  // };

  useEffect(() => {
    console.log("get the id from url");
  }, [id]);

  return (
    <div>
      <form onSubmit={handleSubmit}>
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
        <label>Image Url</label>
        <br />
        <input
          type="text"
          name="imageUrl"
          placeholder="Image Url"
          required
          value={imageUrl}
          onChange={(event) => setImageUrl(event.target.value)}
        />
        {/* <label>Is featured</label>
        <br />
        <input
          type="checkbox"
          name="isFeatured"
          checked={false}
          onChange={(event) => setIsFeatured(event.target.value)}
        />

        */}
        <br />
        <button type="submit">Update Product</button>
      </form>
    </div>
  );
}
export default ProductEditForm;
