const express = require("express");
const pool = require("../modules/pool");
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");
const router = express.Router();

/**
 * GET all orders
 */
router.get("/", rejectUnauthenticated, (req, res) => {
  // GET route code here
  const queryText = `
  SELECT "order"."id" AS "orderId", "order"."status", "order"."option", "order"."total_amount", "order"."created_at", json_agg(
        json_build_object(
            'itemId', "order_item"."id",
            'quantity', "order_item"."quantity",
            'price', "order_item"."unit_price",
            'productName', "order_item"."product_name"
        )
    ) AS "products", "order"."user_id" AS "userId" FROM "order"
JOIN "order_item" ON "order_item"."order_id"="order"."id"
WHERE "order"."user_id"=$1
GROUP BY "order"."id"
ORDER BY "created_at" DESC;`;
  // Query the database for orders belonging to the authenticated user
  pool
    .query(queryText, [req.user.id])
    .then((result) => {
      // Send the fetched orders as the response
      res.send(result.rows);
    })
    .catch((err) => {
      // Log and respond with an error status if the query fails
      console.error("Error fetching :", err);
      res.sendStatus(500);
    });
});

// /**
//  * POST a new order
//  */
router.post("/", rejectUnauthenticated, (req, res) => {
  console.log("req.body", req.body);
  //   // POST route code here, order must look like the below object
  /*
  {
    "status": "purchased",
    "total_amount": "5700",
    "user_id",
    "option",
    "products": [
        {"id": 15,
        "name": "mango",
        "quantity": 20,
        "price": 10.00
        },
        {"id": 16,
        "name": "peer",
        "quantity": 500,
        "price": 10.00 
        },
        {"id": 17,
        "name": "banana",
        "quantity": 50,
        "price": 10.00 
        }
    ]

}
  */
  // Extract data from the request body
  const { status, total_amount, products, option } = req.body;
  const queryText = `
    INSERT INTO "order" ("status", "total_amount", "user_id", "option") VALUES ($1, $2, $3, $4) RETURNING id;`;
  pool
    .query(queryText, [status, total_amount, req.user.id, option])
    .then((result) => {
      console.log("Posted an order");
      const orderId = result.rows[0].id; // Retrieve the new order ID
      const orderItemQueryText = `INSERT INTO "order_item" ("product_name", "quantity", "unit_price", "order_id")
      VALUES ($1, $2, $3, $4);`;
      // Loop through the "products" array and add each item to the "order_item" table
      products.forEach((product) => {
        pool
          .query(orderItemQueryText, [
            product.name,
            product.quantity,
            product.price,
            orderId,
          ])
          .then((result) => {
            console.log(`add product to order items...`);
          })
          .catch((error) => {
            console.log("error adding to order items", error);
            res.sendStatus(500);
          });
      });

      res.sendStatus(201); // Send success status after the order is created
    })
    .catch((err) => {
      console.error("Error posting orders:", err);
      res.sendStatus(500); // Respond with an error status if the insertion fails
    });
});

// Delete an order and all associated order items
router.delete("/:orderId", rejectUnauthenticated, (req, res) => {
  const queryString = `DELETE FROM "order" WHERE "id"=$1;`;
  pool
    .query(queryString, [req.params.orderId])
    .then((result) => {
      console.log("delete order and all order items on the order");
      res.sendStatus(201); // Respond with a success status after deletion
    })
    .catch((error) => {
      console.log("Error in removing order and order items", error);
      res.sendStatus(500); // Respond with an error status if the deletion fails
    });
});

// //Update an order (STRETCH GOAL)
router.put("/pay/:orderId", (req, res) => {
  let orderId = req.params.orderId; // Extract the order ID from route parameters
  const PAID = "paid"; // The status to update the order to
  let sqlText = `UPDATE "order" SET "status"=$1 WHERE "id"=$2; `;
  pool
    .query(sqlText, [PAID, orderId])
    .then((result) => {
      res.sendStatus(201); // Respond with a success status after the update
    })
    .catch((err) => {
      console.error(err); // Log the error
      res.sendStatus(500); // Respond with an error status if the update fails
    });
});

module.exports = router; // Export the router to be used in the main app
