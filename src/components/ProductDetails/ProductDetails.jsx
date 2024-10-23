import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { Card } from "react-bootstrap";
import { useDispatch } from "react-redux";

function ProductDetails(props) {
  const { id } = useParams();
  console.log("my product id", id);

  const products = useSelector((store) => store.product);
  const user = useSelector((store) => store.user);
  const history = useHistory();
  const dispatch = useDispatch();
  const product = products.find((product) => Number(product.id) === Number(id));
  const [details, setDetails] = useState("Product Details");
  // const handleClick = () => {
  //   history.push(`/`);
  // };
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
    history.push("/product");
  };

  return (
    <div style={{ backgroundColor: "#11ee52" }}>
      {user.role.toLowerCase() === "farmer" && (
        <div>
          <button onClick={() => handleEdit(product.id)}> Edit</button>{" "}
          <button
            onClick={() => handleDelete(product.id)}
            style={{ backgroundColor: "red", color: "white" }}
          >
            Remove
          </button>
        </div>
      )}

      {product?.id ? (
        <>
          <h1>{product?.name}</h1>
          <img src={product?.poster} alt={product?.name} />
          <Card
            className="shadow-sm mb-4"
            style={{ backgroundColor: "#fff3cd" }}
          >
            <Card.Body className="d-flex flex-column justify-content-between">
              <Card.Text
                className="lead text-dark"
                style={{ fontSize: "1.1rem", lineHeight: "1.5" }}
              >
                {product?.description}
                {product?.category}
                {product?.stock_quantity}

                {product?.created_at}
                {product?.updated_at}
              </Card.Text>
            </Card.Body>
          </Card>

          <div className="text-center"></div>
        </>
      ) : (
        <p>Product not found</p>
      )}
    </div>
  );
}

export default ProductDetails;
