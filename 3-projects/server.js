const express = require("express");
const app = express();
require('dotenv').config()

const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "cyf_ecommerce",
  password: process.env.PASS_WORD,
  port: 5432,
});
app.get("/", (req, res) => {
  res.send("hello");
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

const productSelect =
  "SELECT products.product_name,suppliers.supplier_name,product_availability.unit_price" +
  " FROM products INNER JOIN product_availability ON products.id = product_availability.prod_id" +
  " INNER JOIN suppliers ON suppliers.id =  product_availability.supp_id";
app.get("/products", function (req, res) {
  pool
    .query(productSelect)
    .then((result) => res.json(result.rows))
    .catch((error) => {
      console.error(error);
      res.status(500).json(error);
    });
});

app.listen(3000, function () {
  console.log("Server is listening on port 3000. Ready to accept requests!");
});
