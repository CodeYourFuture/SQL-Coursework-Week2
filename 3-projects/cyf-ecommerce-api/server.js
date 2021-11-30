const express = require("express");
const app = express();

const PORT = process.env.PORT || 3000;

const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "cyf_ecommerce",
  password: "",
  port: 5432,
});

app.get("/", (req, res) => {
  res.json("Welcome to the server!");
});

app.get("/customers", (req, res) => {
  pool.query("SELECT * FROM customers", (error, result) => {
    if (!error) {
      res.json(result.rows);
    } else {
      console.log(error);
    }
  });
});

app.get("/suppliers", (req, res) => {
  pool.query("SELECT * FROM suppliers", (error, result) => {
    if (!error) {
      res.json(result.rows);
    } else {
      console.log(error);
    }
  });
});

app.get("/products", (req, res) => {
  pool.query(
    "SELECT product_name, unit_price, supplier_name FROM product_availability INNER JOIN products ON prod_id = products.id INNER JOIN suppliers ON supp_id = suppliers.id",
    (error, result) => {
      if (!error) {
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
