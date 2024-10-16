import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name TemplateFunction with the name for the new component.
function ProductList(props) {
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'
  const products = useSelector((store) => store.product);
  const [product, setProduct] = useState("My product page");
  const history = useHistory();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({
      type: "FETCH_PRODUCT",
    });
    setProduct;
  }, []);

  const addToCart = (product) => {
    console.log("add item to the cart", product);
    //dispatch to 'SET_CART' to add my product the global cart store
    //product is one product item added to the cart

    dispatch({
      type: "SET_CART",
      payload: product,
    });
  };

  const viewDetails = (productId) => {
    console.log("navigate to product detail page", productId);

    history.push(`/details/${productId}`);
  };

  const goToCart = () => {
    history.push(`/cart`);
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

              <th>Image_url</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, productId) => (
              <tr key={productId}>
                <td>{product.name}</td>
                <td>{product.price}</td>

                <td>{product.image_url}</td>
                <td>
                  <button onClick={() => addToCart(product)}>
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
      <br />
      <td>
        <button onClick={() => goToCart(product)}>Go To Cart</button>
      </td>
    </div>
  );
}

export default ProductList;
