const express = require("express");
const app = express();
const { Pool } = require("pg");

const pool = new Pool({
  user: "andilemasela",
  host: "localhost",
  database: "cyf_ecommerce",
  password: "Masela@2018",
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
app.get("/products", function (req, res) {
  pool.query(
    "SELECT product_name,supplier_name,unit_price FROM products INNER JOIN product_availability ON product_availability.prod_id= products.id INNER JOIN suppliers ON product_availability.supp_id=suppliers.id",
    (error, result) => {
      res.json(result.rows);
    }
  );
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, function () {
  console.log(`Server is listening to port ${PORT}. Ready to receive requests`);
});
