const express = require("express");
const app = express();

app.listen(4000, function () {
  console.log("Server is listening on port 3000. Ready to accept requests!");
});

const { Pool } = require("pg");

const pool = new Pool({
  user: "*****",
  host: "localhost",
  database: "cyf_ecommerce",
  password: "*****",
  port: 5432,
});

app.get("/customers", function (req, res) {
  pool
    .query("SELECT * FROM customers")
    .then((result) => res.json(result.rows))
    .catch((error) => {
      console.error(error);
      res.status(500).json(error);
    });
});

app.get("/suppliers", function (req, res) {
  pool
    .query("SELECT * FROM suppliers")
    .then((result) => res.json(result.rows))
    .catch((error) => {
      console.error(error);
      res.status(500).json(error);
    });
});

app.get("/products", function (req, res) {
  pool
    .query(
      "SELECT products.product_name, product_availability.unit_price, suppliers.supplier_name FROM product_availability INNER JOIN suppliers ON product_availability.supp_id = suppliers.id INNER JOIN products ON product_availability.prod_id = products.id"
    )
    .then((result) => res.json(result.rows))
    .catch((error) => {
      console.error(error);
      res.status(500).json(error);
    });
});
