const express = require("express");



const pool = require("../Pool");




const router = express.Router();

// GET /products/only-products
router.get("/only-products", (req, res) => {
  pool.query("SELECT * FROM products", (error, result) => {
    res.json(result.rows);
  });
});

// POST /products
router.post("/", (req, res) => {
  const { productName } = req.body;

  if (!productName.length) {
    return res.status(400).send({
      success: false,
      message:
        "product name field cannot be empty, please fix and try again...",
    });
  }

  pool
    .query("SELECT * FROM products WHERE product_name=$1", [productName])
    .then((result) => {
      if (result.rows.length > 0) {
        return res
          .status(400)
          .send("A product with the same name already exists");
      } else {
        const query = "INSERT INTO products (product_name) VALUES ($1)";

        pool
          .query(query, [productName])
          .then(() => res.send("Product Successfully added"))
          .catch((error) => {
            console.log(error);
            res.status(500).json(error);
          });
      }
    });
});

// GET /products and GET /products?name=example
router.get("/", (req, res) => {
  const { name } = req.query;
  let query =
    "SELECT products.product_name, product_availability.unit_price, suppliers.supplier_name FROM products INNER JOIN product_availability ON products.id = product_availability.prod_id INNER JOIN suppliers ON product_availability.supp_id = suppliers.id ORDER BY products.product_name";

  let params = [];

  if (name) {
    query =
      "SELECT products.product_name, product_availability.unit_price, suppliers.supplier_name FROM products INNER JOIN product_availability ON products.id = product_availability.prod_id INNER JOIN suppliers ON product_availability.supp_id = suppliers.id WHERE products.product_name LIKE $1 ORDER BY products.product_name";

    params.push(`%${name}%`);
  }

  pool
    .query(query, params)
    .then((result) => res.status(200).json(result.rows))
    .catch((error) => {
      console.log(error);
      res.status(500).json(error);
    });
});

module.exports = router;
