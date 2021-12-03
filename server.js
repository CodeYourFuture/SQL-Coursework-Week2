const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;

const { Pool } = require("pg");
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "cyf_ecommerce",
  password: "Pa55w0rd123!",
  port: 5432,
});

app.get("/suppliers", function (req, res) {
  pool.query("SELECT * FROM suppliers", (error, result) => {
    res.json(result.rows);
  });
});

app.get("/suppliers", function (req, res) {
  pool.query("SELECT * FROM suppliers", (error, result) => {
    res.json(result.rows);
  });
});

app.listen(PORT, () => {
  console.log(`Port running on ${PORT}`);
});
