const express = require("express");
const app = express();
const { Pool } = require("pg");

const db = new Pool({
  user: "codeyourfuture", // replace with you username
  host: "localhost",
  database: "cyf_ecommerce",
  password: "cyf123",
  port: 5432,
});

app.listen(3000, function () {
  console.log("Server is listening on port 3000. Ready to accept requests!");
});

app.get("/customers", function (req, res) {
  db.query("SELECT * FROM customers", (error, result) => {
    res.json(result.rows);
  });
});


app.get("/suppliers", function (req, res) {
  db.query("SELECT * FROM suppliers", (error, result) => {
    res.json(result.rows);
  });
});


app.get("/products", function (req, res) {
  db.query("SELECT product_availability.unit_price, products.product_name, suppliers.supplier_name FROM product_availability INNER JOIN products on products.id=product_availability.prod_id INNER JOIN suppliers ON suppliers.id=product_availability.supp_id", (error, result) => {
    res.json(result.rows);
  });
});