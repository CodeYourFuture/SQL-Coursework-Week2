const express = require("express");

const { Pool } = require("pg");

const pool = new Pool({
  host: "localhost",
  port: 5432,
  user: "wiam",
  password: "hello123",
  database: "cyf_ecommerce",
});

const cors = require("cors");

const app = express();

app.use(express.json());

app.use(cors());

app.get("/products", (req, res) => {
  pool.query(
    "SELECT products.product_name, product_availability.unit_price, suppliers.supplier_name FROM products INNER JOIN product_availability ON products.id = product_availability.prod_id INNER JOIN suppliers ON product_availability.supp_id = suppliers.id;",
    (error, result) => {
      res.json(result.rows);
    }
  );
});

app.get("/suppliers", (req, res) => {
  pool.query("SELECT * FROM suppliers", (error, result) => {
    res.json(result.rows);
  });
});

app.get("/customers", (req, res) => {
  pool.query("SELECT * FROM customers", (error, result) => {
    res.json(result.rows);
  });
});

app.get("/", (req, res) => {
  return res
    .status(200)
    .send({ success: true, message: "Welcome to Wiam's ecommerce API" });
});

const PORT = process.env.PORT || 5000;
const listener = app.listen(PORT, () =>
  console.log(`Your app is listening on port ${PORT}`)
);
