const express = require("express");
const { Pool } = require("pg");

const pool = new Pool({
  user: "berkeli",
  host: "localhost",
  database: "cyf_ecommerce",
  password: "postgres",
  port: 5432,
});

const app = express();

app.get("/customers", (_req, res) => {
  pool.query("SELECT * FROM customers", (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).json(results.rows);
  });
});

app.get("/suppliers", (_req, res) => {
  pool.query("SELECT * FROM suppliers", (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).json(results.rows);
  });
});

app.get("/products", (_req, res) => {
  let pgQuery =
    "SELECT products.product_name, product_availability.unit_price, suppliers.supplier_name FROM products ";
  pgQuery +=
    "INNER JOIN product_availability ON products.id = product_availability.prod_id ";
  pgQuery +=
    "INNER JOIN suppliers ON product_availability.supp_id = suppliers.id";
  pool.query(pgQuery, (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).json(results.rows);
  });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
