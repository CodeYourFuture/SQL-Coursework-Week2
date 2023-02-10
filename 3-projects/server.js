const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const { Pool } = require("pg");

const pool = new Pool({
  user: "bahar",
  host: "localhost",
  database: "cyf_ecommerce",
  password: "",
  PORT: 5432,
});
app.get("/customers", (req, res) => {
  pool.query("SELECT * FROM customers", (error, result) => {
    (res) => res.json(result.rows);
  });
});
app.get("/suppliers", (req, res) => {
  pool.query("SELECT * FROM suppliers", (error, result) => {
    res.json(result.rows);
  });
});
app.get("/products", (req, res) => {
  pool.query(
    "SELECT products.product_name,product_availability.unit_price,suppliers.supplier_name FROM product_availability INNER JOIN products ON  products.id=product_availability.prod_id INNER JOIN suppliers ON supplier.id=product_availability.supp_id",
    (error, result) => {
      res.json(result.rows);
    }
  );
});
app.listen(PORT, () => {
  console.log(`server is runnig on port ${PORT}`);
});
