const express = require("express");
const app = express();

const PORT = process.env.PORT || 5000;

const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "cyf_ecommerce",
  password: "",
  port: 5432,
});

app.get("/", (req, res) => {
  res.json("Welcome to the cyf_ecommerce server");
});

app.get("/customers", (req, res) => {
  pool.query("SELECT * FROM customers", (err, result) => {
    if (res.status(200)) {
      res.json(result.rows);
    } else {
      console.log(err);
    }
  });
});

app.get("/suppliers", (req, res) => {
  pool.query("SELECT * FROM suppliers", (err, result) => {
    if (res.status(200)) {
      res.json(result.rows);
    } else {
      console.log(error);
    }
  });
});

app.get("/products", (req, res) => {
  pool.query(
    "SELECT products.product_name, product_availability.unit_price, suppliers.supplier_name FROM product_availability INNER JOIN  product_availability.prod_id = products.id INNER JOIN suppliers on product_availability.supp_id = suppliers.id",
    (err, result) => {
      if (res.status(200)) {
        res.json(result.rows);
      } else {
        console.log(err);
      }
    }
  );
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}. Ready to accept requests!`);
});
