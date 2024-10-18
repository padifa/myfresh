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
  const queryText = `SELECT "order"."id" AS "orderId", "order"."status", "order"."total_amount", "order"."created_at", "order"."user_id" AS "userId", json_agg("order_item"."id") AS "products" FROM "order"
    JOIN "order_item" ON "order_item"."order_id"="order"."id"
    WHERE "order"."user_id"=$1
    GROUP BY "order"."id"
    ORDER BY "created_at" DESC;`;
  pool
    .query(queryText, [req.user.id])
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      console.error("Error fetching :", err);
      res.sendStatus(500);
    });
});

// /**
//  * POST a new order
//  */
router.post("/", rejectUnauthenticated, (req, res) => {
  //   // POST route code here, order must look like the below object
  /*
  {
    "status": "purchased",
    "total_amount": "5700",
    "user_id",
    "option",
    "products": [
        {"id": 15,
        "product_name": "mango",
        "quantity": 20,
        "unit_price": 10.00
        },
        {"id": 16,
        "product_name": "peer",
        "quantity": 500,
        "unit_price": 10.00 
        },
        {"id": 17,
        "product_name": "banana",
        "quantity": 50,
        "unit_price": 10.00 
        }
    ]

}
  */
  const { status, total_amount, products, option } = req.body;
  const queryText = `
    INSERT INTO "order" ("status", "total_amount", "user_id", "option") VALUES ($1, $2, $3, $4) RETURNING id;`;
  pool
    .query(queryText, [status, total_amount, req.user.id, option])
    .then((result) => {
      console.log("Posted an order");
      const orderId = result.rows[0].id;
      const orderItemQueryText = `INSERT INTO "order_item" ("product_name", "quantity", "unit_price", "order_id")
      VALUES ($1, $2, $3, $4);`;
      //loop through the product key "products" from the req.body
      products.forEach((product) => {
        pool
          .query(orderItemQueryText, [
            product.product_name,
            product.quantity,
            product.unit_price,
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

      res.sendStatus(201);
    })
    .catch((err) => {
      console.error("Error posting orders:", err);
      res.sendStatus(500);
    });
});

//Delete an order and all associated order items
router.delete("/:orderId", rejectUnauthenticated, (req, res) => {
  const queryString = `DELETE FROM "order" WHERE "id"=$1;`;
  pool
    .query(queryString, [req.params.orderId])
    .then((result) => {
      console.log("delete order and all order items on the order");
      res.sendStatus(201);
    })
    .catch((error) => {
      console.log("Error in removing order and order items", error);
      res.sendStatus(500);
    });
});

// //Update an order (STRETCH GOAL)
// router.put("/:productId", (req, res) => {
//   let productId = req.params.productId;
//   const { name, description, price, stock_quantity, image_url, category } =
//     req.body;
//   let sqlText = `UPDATE "product" SET "name"=$1, "description"=$2, "price"=$3, "stock_quantity"=$4, "image_url"=$5, "category"=$6 WHERE "id"=$7; `;
//   pool
//     .query(sqlText, [
//       name,
//       description,
//       price,
//       stock_quantity,
//       image_url,
//       category,
//       productId,
//     ])
//     .then((result) => {
//       res.sendStatus(201);
//     })
//     .catch((err) => {
//       console.error(err);
//       res.sendStatus(500);
//     });
// });
// //Delete a product?
// router.delete("/:productId", (req, res) => {
//   console.log("req.params", req.params);
//   const queryText = `DELETE FROM "product" WHERE id=$1;`;
//   pool
//     .query(queryText, [req.params.productId])
//     .then((result) => {
//       res.sendStatus(201);
//     })
//     .catch((err) => {
//       console.error(err);
//       res.sendStatus(500);
//     });
// });
module.exports = router;
