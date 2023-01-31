const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();

const { Pool } = require("pg");

const db = new Pool({
  user: process.env.DB_USER,
  host: "localhost",
  database: "cyf_ecommerce",
  password: process.env.DB_PASSWORD,
  port: 5432,
});

app.get("/customers", function (req, res) {
  db.query("SELECT * FROM customers")
    .then((result) => res.json(result.rows))
    .catch((error) => {
      console.error(error);
      res.status(500).json(error);
    });
});

app.get("/suppliers", function (req, res) {
  db.query("SELECT * FROM suppliers")
    .then((result) => res.json(result.rows))
    .catch((error) => {
      console.error(error);
      res.status(500).json(error);
    });
});

app.get("/products", function (req, res) {
  db.query(
    `SELECT p.product_name, pa.unit_price, s.supplier_name 
    FROM products AS p 
    JOIN product_availability AS pa ON p.id = pa.prod_id 
    JOIN suppliers AS s ON pa.supp_id = s.id`
  )
    .then((result) => res.json(result.rows))
    .catch((error) => {
      console.error(error);
      res.status(500).json(error);
    });
});

app.listen(3000, function () {
  console.log("Server is listening on port 3000. Ready to accept requests!");
});
