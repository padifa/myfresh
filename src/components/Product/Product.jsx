import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name TemplateFunction with the name for the new component.
function Product(props) {
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'
  const products = useSelector((store) => store.product);
  const [heading, setHeading] = useState("Functional Component");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({
      type: "FETCH_PRODUCT",
    });
  }, []);

  return (
    <div>
      <h2>{heading}</h2>
      {JSON.stringify(products)}
    </div>
  );
}

export default Product;
