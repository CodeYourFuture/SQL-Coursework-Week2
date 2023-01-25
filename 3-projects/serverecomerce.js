const express = require("express");
const app = express();

const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "cyf_ecommerce",
  password: "",
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
app.get("/products", function (req, res) {
  pool
    .query("SELECT p.product_name, pa.unit_price,
   s.supplier_name
   FROM products p
   INNER JOIN product_availability pa ON (p.id = pa.prod_id) 
   INNER JOIN suppliers s ON (s.id = pa.supp_id)")
    .then((result) => res.json(result.rows))
    .catch((error) => {
      console.error(error);
      res.status(500).json(error);
    });
});


app.listen(3000, function () {
  console.log("Server is listening on port 3000. Ready to accept requests!");
});
