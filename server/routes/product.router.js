const express = require("express");
const pool = require("../modules/pool");
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");
const router = express.Router();

/**
 * GET all products
 */
router.get("/", rejectUnauthenticated, (req, res) => {
  // This route retrieves all products from the "product" table.
  // Products are ordered by the "created_at" column in descending order.
  const queryText = 'SELECT * FROM "product" ORDER BY "created_at" DESC';
  pool
    .query(queryText)
    .then((result) => {
      // Sends the retrieved product rows as a response.
      res.send(result.rows);
    })
    .catch((err) => {
      // Logs the error and sends a 500 status if the query fails.
      console.error("Error fetching products:", err);
      res.sendStatus(500);
    });
});

/**
 * POST a new product
 */
router.post("/", rejectUnauthenticated, (req, res) => {
  // This route adds a new product to the "product" table.
  console.log("new product to db", req.body);
  const { name, description, price, stock_quantity, image_url, category } =
    req.body;

  // SQL query to insert a new product record.
  const queryText = `
    INSERT INTO "product" ("name", "description", "price", "stock_quantity", "image_url", "category", "user_id", "farm")
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8 ) RETURNING id;`;

  pool
    .query(queryText, [
      name,
      description,
      Number(price), // Ensures price is treated as a number.
      Number(stock_quantity), // Ensures stock_quantity is treated as a number.
      image_url,
      category,
      req.user.id, // Retrieves the user ID from the authenticated user's session.
      req.user.farm_name, // Retrieves the farm name from the authenticated user's session.
    ])
    .then((result) => {
      // Logs a success message and sends a 201 status code.
      console.log("created a new product");
      res.sendStatus(201);
    })
    .catch((err) => {
      // Logs the error and sends a 500 status if the query fails.
      console.error("Error inserting product:", err);
      res.sendStatus(500);
    });
});

/**
 * Update a product
 */
router.put("/:productId", rejectUnauthenticated, (req, res) => {
  // This route updates an existing product in the "product" table.
  let productId = req.params.productId; // Retrieves the product ID from the route parameters.
  const {
    name,
    description,
    price,
    stock_quantity,
    image_url,
    category,
    farm,
  } = req.body;

  // SQL query to update the product record with the provided details.
  const sqlText = `UPDATE "product" SET "name"=$1, "description"=$2, "price"=$3, "stock_quantity"=$4, "image_url"=$5, "category"=$6, "farm"=$7 WHERE "id"=$8; `;

  pool
    .query(sqlText, [
      name,
      description,
      Number(price), // Ensures price is treated as a number.
      Number(stock_quantity), // Ensures stock_quantity is treated as a number.
      image_url,
      category,
      farm,
      productId, // Uses the product ID to locate the record to update.
    ])
    .then((result) => {
      // Sends a 201 status code on successful update.
      res.sendStatus(201);
    })
    .catch((err) => {
      // Logs the error and sends a 500 status if the query fails.
      console.error(err);
      res.sendStatus(500);
    });
});

/**
 * Delete a product
 */
router.delete("/:productId", rejectUnauthenticated, (req, res) => {
  // This route deletes a product from the "product" table.
  console.log("req.params", req.params); // Logs the route parameters for debugging.
  const queryText = `DELETE FROM "product" WHERE id=$1;`; // SQL query to delete the product by ID.
  pool
    .query(queryText, [req.params.productId]) // Uses the product ID from the route parameters.
    .then((result) => {
      // Sends a 201 status code on successful deletion.
      res.sendStatus(201);
    })
    .catch((err) => {
      // Logs the error and sends a 500 status if the query fails.
      console.error(err);
      res.sendStatus(500);
    });
});

// Exports the router to be used in other parts of the application.
module.exports = router;
