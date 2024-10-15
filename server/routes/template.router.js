const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();

/**
 * GET route template
 */
router.get("/", (req, res) => {
  // GET route code here
  const queryText = 'SELECT * FROM "product" ORDER BY "created_at" DESC';
  pool
    .query(queryText)
    .then((result) => {
      res.sendStatus(result.rows);
    })
    .catch((err) => {
      console.error("Error fetching products:", err);
      res.sendStatus(500);
    });
});

/**
 * POST route template
 */
router.post("/", (req, res) => {
  // POST route code here
  const {
    name,
    description,
    price,
    stock_quantity,
    image_url,
    category,
    user_id,
  } = req.body;
  const queryText = `
INSERT INTO "product" ("name", "description", "price", "stock_quantity", "is_featured", "created_at", "updated_at", "image_url", "category", "user_id")
VALUES ("$1", "$2", "$3", "$4", "$5", "$6", "$7",) RETURNING id;`;
  pool
    .query(queryText, [
      name,
      description,
      price,
      stock_quantity,
      image_url,
      category,
      user_id,
    ])
    .then((result) => {
      res.status(201);
    })
    .catch((err) => {
      console.error("Error inserting product:", err);
      res.sendStatus(500);
    });
});

module.exports = router;
