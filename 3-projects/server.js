const express = require("express");
const app = express();
const { Pool } = require("pg");
app.use(express.json());
const pool = new Pool({
  user: "oxy",
  host: "localhost",
  database: "cyf_ecommerce",
  password: "",
  port: 5432,
});
app.get("/customers", (req, res) => {
  pool.query("SElECT * FROM customers", (error, result) => {
    console.log(result.rows);
    res.json(result.rows);
  });
});
app.get("/suppliers", (req, res) => {
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
app.listen(3000, function () {
  console.log("Server is listening on port 3000!");
});










