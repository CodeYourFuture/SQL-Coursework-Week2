const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const { Pool } = require("pg");

const pool = new Pool({
  user: "Azan",
  host: "localhost",
  database: "cyf_ecommerce",
  password: "azan",
  port: 5432,
});

app.get("/customers", (req, res) => {
  pool.query("SELECT * FROM customers", (error, result) => {
    if (error) {
      console.log(error);
    }
    res.json(result.rows);
  });
});

app.get("/suppliers", (req, res) => {
  pool.query("SELECT * FROM suppliers", (error, result) => {
    if (error) {
      console.log(error);
    }
    res.json(result.rows);
  });
});

app.get("/products", (req, res) => {
  pool.query(
    "SELECT products.product_name, product_availability.unit_price, suppliers.supplier_name FROM products INNER JOIN product_availability ON products.id = product_availability.prod_id INNER JOIN suppliers ON suppliers.id = product_availability.supp_id",
    (error, result) => {
      if (error) {
        console.log(error);
      }
      res.json(result.rows);
    }
  );
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}. Ready to accept requests!`);
});
