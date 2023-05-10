const { response, request } = require("express");
const express = require("express");
const app = express();
const port = process.env.PORT || 3006;

const { Pool } = require("pg");

const db = new Pool({
  user: "andriana",
  host: "localhost",
  database: "cyf_ecommerce",
  password: "",
  port: 5432,
});

app.get("/", (request, response) => {
  response.send("Andriana's e-commerce server and database");
});

app.get("/customers", (request, response) => {
  db.query("SELECT * FROM customers", (error, result) => {
    response.json(result.rows);
  });
});

app.get("/suppliers", (request, response) => {
  db.query("SELECT * FROM suppliers", (error, result) => {
    response.json(result.rows);
  });
});

app.get("/products", (request, response) => {
  db.query(
    "SELECT p.product_name, pa.unit_price, s.supplier_name FROM products p JOIN product_availability pa ON (pa.prod_id = p.id) JOIN suppliers s ON (s.id = pa.supp_id)",
    (error, result) => {
      response.json(result.rows);
    }
  );
});

app.listen(port, () => {
  console.log(`Server is listening on ${port}`);
});
