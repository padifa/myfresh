import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import ProductListItem from "../ProductListItem/ProductListItem";
// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name TemplateFunction with the name for the new component.
function ProductList(props) {
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'
  const products = useSelector((store) => store.product);
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  useEffect(() => {
    dispatch({
      type: "FETCH_PRODUCT",
    });
  }, [dispatch]);
  const goToCart = () => {
    history.push(`/cart`);
  };
  const addProduct = (event) => {
    console.log("add new product");
    history.push(`/productForm`);
  };

  return (
    <div>
      <button onClick={goToCart}>Go To Cart</button>
      {user.role === "farmer" && (
        <button onClick={addProduct}>Add Product</button>
      )}

      {products && products.length > 0 ? (
        <table className="product_table">
          <thead>
            <tr>
              <th>name</th>
              <th>price</th>
              <th>Quantity</th>
              <th>Image_url</th>
              <th></th>
              <th></th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <ProductListItem key={product.id} product={product} />
            ))}
          </tbody>
        </table>
      ) : (
        <p>No products found</p>
      )}
    </div>
  );
}

export default ProductList;
