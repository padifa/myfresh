import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name TemplateFunction with the name for the new component.
function ProductList(props) {
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'
  const products = useSelector((store) => store.product);
  const [product, setProduct] = useState("My product page");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({
      type: "FETCH_PRODUCT",
    });
    setProduct;
  }, []);

  const addToCart = (productId) => {
    console.log("add item to the cart", productId);
  };

  const viewDetails = (productId) => {
    console.log("navigate to product detail page", productId);
  };

  return (
    <div>
      <h2>{product}</h2>

      {products && products.length > 0 ? (
        <table className="product_table">
          <thead>
            <tr>
              <th>name</th>
              <th>price</th>
              {/* <th>description</th> */}
              {/* <th>category</th>
              <th>stock_quantity</th>
              <th>is_featured</th>
              <th>created_at</th>
              <th>updated_at</th> */}
              <th>Image_url</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, id) => (
              <tr key={id}>
                <td>{product.name}</td>
                <td>{product.price}</td>
                {/* <td>{product.description}</td>
                <td>{product.category}</td>
                <td>{product.stock_quantity}</td>
                <td>{product.is_featured}</td>
                <td>{product.created_at}</td>
                <td>{product.updated_at}</td> */}
                <td>{product.image_url}</td>
                <td>
                  <button onClick={() => addToCart(product.id)}>
                    Add to cart
                  </button>
                </td>
                <td>
                  <button onClick={() => viewDetails(product.id)}>
                    Details
                  </button>
                </td>
              </tr>
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
