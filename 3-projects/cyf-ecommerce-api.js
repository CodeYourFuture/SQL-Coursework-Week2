const express = require("express");

const { Pool } = require("pg");
const app = express();

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "cyf_ecommerce",
  password: "Lidya2021",
  port: 5432,
});

app.get("/customers", (req, res) => {
  const sql = "SELECT * FROM customers";
  const params = [];
  pool
    .query(sql, params)
    .then((result) => res.json(result.rows))
    .catch((error) => {
      console.error(error);
      res.status(500).json(error);
    });
});

app.get("/suppliers", (req, res) => {
  const sql = "SELECT * FROM customers";
  const params = [];
  pool
    .query(sql, params)
    .then((result) => res.json(result.rows))
    .catch((error) => {
      console.error(error);
      res.status(500).json(error);
    });
});

app.listen(3000, function () {
  console.log("Server is listening on port 3000. Ready to accept requests!");
});
