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
  // GET route code here
  const queryText = 'SELECT * FROM "product" ORDER BY "created_at" DESC';
  pool
    .query(queryText)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      console.error("Error fetching products:", err);
      res.sendStatus(500);
    });
});

/**
 * POST a new product
 */
router.post("/", rejectUnauthenticated, (req, res) => {
  // POST route code here
  console.log("new product to db", req.body);
  const { name, description, price, stock_quantity, image_url, category } =
    req.body;
  const queryText = `
    INSERT INTO "product" ("name", "description", "price", "stock_quantity", "image_url", "category", "user_id")
    VALUES ($1, $2, $3, $4, $5, $6, $7 ) RETURNING id;`;
  pool
    .query(queryText, [
      name,
      description,
      Number(price),
      Number(stock_quantity),
      image_url,
      category,
      req.user.id,
    ])
    .then((result) => {
      console.log("created a new product");
      res.sendStatus(201);
    })
    .catch((err) => {
      console.error("Error inserting product:", err);
      res.sendStatus(500);
    });
});

//Update a product?
router.put("/:productId", rejectUnauthenticated, (req, res) => {
  let productId = req.params.productId;
  const { name, description, price, stock_quantity, image_url, category } =
    req.body;
  const sqlText = `UPDATE "product" SET "name"=$1, "description"=$2, "price"=$3, "stock_quantity"=$4, "image_url"=$5, "category"=$6 WHERE "id"=$7; `;
  pool
    .query(sqlText, [
      name,
      description,
      Number(price),
      Number(stock_quantity),
      image_url,
      category,
      productId,
    ])
    .then((result) => {
      res.sendStatus(201);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
});
//Delete a product?
router.delete("/:productId", rejectUnauthenticated, (req, res) => {
  console.log("req.params", req.params);
  const queryText = `DELETE FROM "product" WHERE id=$1;`;
  pool
    .query(queryText, [req.params.productId])
    .then((result) => {
      res.sendStatus(201);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
});
module.exports = router;
