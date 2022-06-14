const express = require("express");
const { Pool } = require("pg");

const app = express();

const pool = new Pool({
  host: "localhost",
  database: "cyf_ecommerce",
  user: "iwona",
  password: "",
  port: 5432,
});

app.get("/", (req, res) => {
  res.send("Welcome!");
});

app.get("/customers", (req, res) => {
  pool.query("SELECT * FROM customers", (error, result) => {
    res.send(result.rows);
  });
});

app.get("/suppliers", (req, res) => {
  pool.query("SELECT * FROM suppliers", (error, result) => {
    res.send(result.rows);
  });
});

app.listen(3000, () => console.log("Listening on port 3000."));
