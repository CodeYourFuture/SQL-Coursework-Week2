const express = require("express");
const { Pool } = require("pg");
const app = express();
const pool = new Pool({
  user: "ali",
  database: "cyf_ecommerce",
  host: "localhost",
  password: "admin",
  port: 5432,
});
app.get("/customers", (req, res) => {
  return pool
    .query("SELECT * FROM customers")
    .then((result) => res.send(result))
    .catch((error) => {
      console.error(error);
      res.status(500).json(error);
    });
});
app.get("/suppliers", (req, res) => {
  return pool
    .query("SELECT * FROM suppliers")
    .then((result) => res.send(result))
    .catch((error) => {
      console.error(error);
      res.status(500).json(error);
    });
});
app.get("/products", (req, res) => {
  return pool
    .query(
      "SELECT products.product_name, product_availability.unit_price, suppliers.supplier_name  FROM products INNER JOIN product_availability ON product_availability.prod_id = products.id INNER JOIN suppliers ON suppliers.id = product_availability.supp_id"
    )
    .then((result) => res.send(result))
    .catch((error) => {
      console.error(error);
      res.status(500).json(error);
    });
});
app.listen(3000, () => {
  console.log(`Server running on port: 3000`);
});
