const express = require("express");
const app = express();
const { Pool } = require("pg");

const db = new Pool({
  user: "codeyourfuture",
  host: "localhost",
  database: "cyf_ecommerce",
  password: "cyf123",
  port: 5432,
});

app.get("/customers", function (req, res) {
  db.query("SELECT * FROM customers");

    res.json(result.rows);
  
});

app.get("/suppliers", function (req, res) {
  db.query("SELECT * FROM suppliers");

    res.json(result.rows);
  
});

app.get("/products", (req, res) => {
  db.query(`SELECT products.product_name, product_availability.unit_price, suppliers.supplier_name
  FROM products
  INNER JOIN product_availability
  ON products.id = product_availability.prod_id
  INNER JOIN suppliers
  ON product_availability.supp_id = suppliers.id`);

    res.json(result.rows);

});

app.listen(3000, function () {

  console.log("Server is listening on port 3000.");
  
});