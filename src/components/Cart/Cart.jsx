import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function Cart() {
  const dispatch = useDispatch();
  const history = useHistory();
  const order = useSelector((store) => store.product);
  const products = useSelector((store) => store.product);
  const customer = useSelector((store) => store.product);
  const foundProducts = order.map((productOrder) =>
    products.find((prod) => prod.id === productOrder.id)
  );

  const totalCost = foundProducts
    .reduce((total, product) => total + parseFloat(product?.price || 0), 0)
    .toFixed(2);

  const handleCart = () => {
    const newOrder = {
      ...customer,
      products: order,
      total: totalCost,
    };
    dispatch({ type: "SUBMIT_CART", payload: newOrder });
    history.push("/");
  };

  //   const handleType = (event) => {
  //     console.log("type selection", event.target.id);
  //     setType(event.target.id);
  //   };
  return (
    <>
      <div className="customer-info" style={{ backgroundColor: "#11ee52" }}>
        <h2>Order List</h2>
        {JSON.stringify(product)}
        <ul>
          <li>Username: {customer.username}</li>
          <li>Phone Number: {customer.phone_number}</li>
          <li>E_mail: {customer.email}</li>
          <li>Address: {customer.address}</li>
          <li>City: {customer.city}</li>
          <li>Country: {customer.country}</li>
          <li>Zip: {customer.zip}</li>
        </ul>
      </div>
      <div className="cart_container">
        <h2>Cart</h2>
        <table className="cart_table">
          <thead>
            <tr>
              <th>Product</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {foundProducts.map((item, index) => (
              <tr key={index}>
                <td>{item?.name}</td>
                <td>${item?.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <label>Total:</label>
        <button onClick={handleCart}>Checkout</button>
      </div>
    </>
  );
}

export default Cart;

//   console.log(orders);
//   let foundProducts = [];
//   for (let product of orders) {
//     for (let ordered of products) {
//       if (product.id === ordered.id) {
//         foundProducts.push(ordered);
//       }
//     }
//   }
//   console.log(foundProducts);
//   let totalCost = 0;
//   for (let cost of foundProducts) {
//     const price = parseFloat(cost.price) || 0;
//     if (price > 0) {
//       totalCost += price;
//     }
//   }
//   //   ("username", "password", "phone_number", "role", "created_at", "isAdmin", "email", "address", "farm_name")
//   totalCost = totalCost.toFixed(2);
//   const [id, setId] = useState("");
//   const [username, setUsername] = useState("");
//   const [phone_number, setPhoneNumber] = useState("");
//   const [email, setEmail] = useState("");
//   const [address, setAddress] = useState("");
//   const [city, setCity] = useState("");
//   const [country, setCountry] = useState("");
//   const [zip, setZip] = useState("");

//   const handleCart = () => {
//     const newOrder = {
//       username: customer.username,
//       phone_number: customer.phone_number,
//       email: customer.email,
//       address: customer.address,
//       city: customer.city,
//       country: customer.country,
//       zip: customer.zip,
//       products: customer.order,
//       total: totalCost,
//     };
//     dispatch(cartRequest(newOrder));
//     history.push("/");
//   };
//   return (
//     <>
//       <div className="customer-info">
//         <ul>
//           <li>UserName: {customer.username}</li>
//           <li>Phone_number: {customer.phone.number}</li>
//           <li>E-mail: {customer.email}</li>
//           <li>Address: {customer.address}</li>
//           <li>City: {customer.city}</li>
//           <li>Country: {customer.country}</li>
//           <li>Zip: {customer.zip}</li>
//         </ul>
//       </div>
//       <div className="cart_container">
//         <h2>Cart</h2>
//         <table className="cart_table">
//           <thead>
//             <tr>
//               <th>Product</th>
//               <th>Price</th>
//             </tr>
//           </thead>
//           <tbody>
//             {foundProducts.map((item, id) => (
//               <tr key={id}>
//                 <td>{item.name}</td>
//                 <td>{item.price}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//         <label>Total:</label>
//         <p>${totalCost}</p>
//         <button onClick={handleCart}>Cart</button>
//       </div>
//     </>
//   );
// }
// export default Cart;
