const express = require("express");

const app = express();
const { Pool } = require("pg");

const PORT = process.env.PORT || 4000;

const pool = new Pool({
  user: "Konikalily",
  host: "localhost",
  database: "cyf_ecommerce",
  password: "",
  port: 5432,
});

app.get("/", (req, res) => {
  res.json("Welcome to the CYF server!");
});

app.get("/customers", (req, res) => {
  pool.query("SELECT name FROM customers", (error, result) => {
    if ((error = false)) {
      res.json(result.rows);
    } else {
      console.log(error);
    }
  });
});

app.get("/suppliers", (req, res) => {
  pool.query("SELECT supplier_name FROM suppliers", (error, result) => {
    if ((error = false)) {
      res.json(result.rows);
    } else {
      console.log(error);
    }
  });
});

app.get("/products", (req, res) => {
  pool.query(
    "SELECT products.product_name, product_availability.unit_price, suppliers.supplier_name FROM products INNER JOIN product_availability ON product_availability.prod_id = products.id INNER JOIN suppliers ON product_availability.supp_id = suppliers.id",
    (error, result) => {
      if ((error = false)) {
        res.json(result.rows);
      } else {
        console.log(error);
      }
    }
  );
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}. Ready to accept requests!`);
});
