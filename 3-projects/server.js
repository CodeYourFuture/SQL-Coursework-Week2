const express = require("express");
const app = express();
const { Pool } = require("pg");

const pool = new Pool({
  user: "maziar",
  host: "localhost",
  database: "cyf_ecommerce",
  password: "",
  port: 5432,
});

app.get("/customers", (req, res) => {
  pool.query("SElECT * FROM customers", (error, result) => {
    res.json(result.row);
  });
});

app.get("/suppliers", (req, res) => {
  pool.query("SELECT * FROM suppliers", (error, result) => {
    res.json(result.row);
  });
});

app.get("/products", (req, res) => {
  pool.query(
    "SELECT product_name, unit_price, supplier_name FROM products INNER JOIN products_availability ON products.id =products_availability.prod_id INNER JOIN suppliers ON suppliers.id= products.availability.supp_id;",
    (error, result) => {
      res.json(result.row);
    }
  );
});

app.listen(3000, function () {
  console.log("Server is listening on port 3000!");
});