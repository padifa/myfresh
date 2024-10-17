import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

function ProductDetails(props) {
  const { id } = useParams();
  console.log("my product id", id);

  const products = useSelector((store) => store.product);
  const history = useHistory();
  const product = products.find((product) => Number(product.id) === Number(id));
  const [details, setDetails] = useState("Product Details");
  const handleClick = () => {
    history.push(`/`);
  };

  return (
    <div style={{ backgroundColor: "#11ee52" }}>
      <h2>Product Details</h2>
      {JSON.stringify(product)}

      {/* {product.id ? (
        <>
          <h1>{product.name}</h1>
          <img src={product.poster} alt={product.name} />
          <Card
            className="shadow-sm mb-4"
            style={{ backgroundColor: "#fff3cd" }}
          >
            <Card.Body className="d-flex flex-column justify-content-between">
              <Card.Text
                className="lead text-dark"
                style={{ fontSize: "1.1rem", lineHeight: "1.5" }}
              >
                {product.description}
                {product.category}
                {product.stock_quantity}
                {product.is_featured}
                {product.created_at}
                {product.updated_at}
              </Card.Text>
            </Card.Body>
          </Card>

          <div className="text-center"></div>
        </>
      ) : (
        <p>Product not found</p>
      )} */}
    </div>
  );
}

export default ProductDetails;
