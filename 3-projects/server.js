const express = require("express");
require('dotenv').config();
console.log(process.env)
const app = express();
const port = process.env.PORT || 4000;
const { Pool } = require("pg");

const pool = new Pool({
  user: "seble",
  host: "localhost",
  database: "cyf_ecommerce",
  password: process.env.PASSWORD,
  port: 5432,
  ssl: {
    rejectUnauthorized: false,
  },
});

app.get("/", (req, res) => {
  res.send("Hello");
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
      `select product_name, unit_price as price, supplier_name from products 
        inner join product_availability on products.id = product_availability.prod_id 
        inner join suppliers on suppliers.id = product_availability.supp_id;`
    )
    .then((result) => res.json(result.rows))
    .catch((error) => {
      console.error(error);
      res.status(500).json(error);
    });
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});