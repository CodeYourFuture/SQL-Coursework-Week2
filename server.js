const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;

const { Pool } = require("pg");
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "cyf_ecommerce",
  password: "Pa55w0rd123!",
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

app.get("/products", (req, res) => {
  pool.query(
    "SELECT product_name, unit_price, supplier_name FROM products INNER JOIN products_availability ON products.id =products_availability.prod_id INNER JOIN suppliers ON suppliers.id= products.availability.supp_id;",
    (error, result) => {
      res.json(result.rows);
    }
  );
});

app.listen(PORT, () => {
  console.log(`Port running on ${PORT}`);
});
