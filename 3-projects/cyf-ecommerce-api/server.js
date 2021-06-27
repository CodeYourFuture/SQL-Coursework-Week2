const express = require("express");
const app = express();

app.listen(3000, function () {
  console.log("Server is listening on port 3000. Ready to accept requests!");
});
const { Pool } = require("pg");

const pool = new Pool({
  user: "codeyourfuture",
  host: "localhost",
  database: "cyf_ecommerce",
  password: "codeyourfuture",
  port: 5432,
});

app.get("/customers", function (req, res) {
  pool.query("SELECT * FROM customers", (error, result) => {
    res.json(result.rows);
  });
});

app.get("/suppliers", function (req, res) {
  pool.query("SELECT * FROM suppliers", (error, result) => {
    res.json(result.rows);
  });
});

app.get("/products", function (req, res) {
  const query =
    "SELECT products.product_name,product_availability.unit_price,suppliers.supplier_name FROM products INNER JOIN product_availability ON products.id=product_availability.prod_id INNER JOIN suppliers ON product_availability.supp_id=suppliers.id";
  pool.query(query, (error, result) => {
    res.json(result.rows);
  });
});