import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name TemplateFunction with the name for the new component.
function ProductListItem({ product }) {
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'
  const [quantity, setQuantity] = useState(1);
  //   const viewDetails =
  //   const store = useSelector((store) => store);
  const dispatch = useDispatch();
  const history = useHistory();
  const viewDetails = (productId) => {
    console.log("navigate to product detail page", productId);

    history.push(`/details/${productId}`);
  };
  const addToCart = (product) => {
    console.log("add item to the cart", product);
    //dispatch to 'SET_CART' to add my product the global cart store
    //product is one product item added to the cart
    const cartItem = { ...product };
    cartItem.quantity = quantity;

    dispatch({
      type: "ADD_TO_CART",
      payload: cartItem,
    });
  };

  const adjustQuantity = (amount) => {
    if (amount === "increase") {
      setQuantity(quantity + 1);
    } else if (amount === "decrease" && quantity > 1) {
      setQuantity(quantity - 1);
    } else {
      setQuantity(1);
    }
  };

  //   useEffect(() => {
  //     dispatch({
  //       type: "SET_CART",
  //     });
  //   }, []);

  return (
    <tr>
      <td>{product.name}</td>
      <td>{product.price}</td>
      <td>{quantity}</td>
      <td>{product.image_url}</td>
      <td>
        <button onClick={() => adjustQuantity("increase")}>+1</button>
      </td>
      <td>
        <button onClick={() => adjustQuantity("decrease")}>-1</button>
      </td>
      <td>
        <button onClick={() => addToCart(product)}>Add to cart</button>
      </td>
      <td>
        <button onClick={() => viewDetails(product.id)}>Details</button>
      </td>
    </tr>
  );
}

export default ProductListItem;
