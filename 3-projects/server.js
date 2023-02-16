const express = require("express");
const app = express();
const { Pool } = require("pg");
const db = new Pool({
  user: "kmona", // replace with you username
  host: "localhost",
  database: "cyf_ecommerce",
  password: "0007",
  port: 5432,
});

app.get("/customers", function (req, res) {
  db.query("SELECT * FROM customers", (error, result) => {
    res.json(result.rows);
  });
});
app.get("/suppliers", function (req, res) {
  db.query("SELECT * FROM suppliers", (error, result) => {
    res.json(result.rows);
  });
});

app.get("/products", function (req, res) {
  db.query("SELECT * FROM products", (error, result) => {
    res.json(result.rows);
  });
});

app.listen(9090, () => {
  console.log("hi I'm from node js  9090");
});
