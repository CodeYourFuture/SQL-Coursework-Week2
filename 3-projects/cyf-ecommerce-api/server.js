const express = require("express");
const app = express();
const { Pool } = require("pg");

const port = 3000;

const pool = new Pool({
  user: "marina",
  host: "localhost",
  database: "cyf_ecommerce",
  password: "",
  port: 5432,
});

app.get("/customers", (req, res) => {
  pool
    .query("SELECT * FROM customers;")
    .then((result) => res.json(result))
    .catch((error) => {
      console.log(error);
      res.status(500).json(error);
    });
});

app.get("/suppliers", (req, res) => {
    pool
      .query("SELECT * FROM suppliers;")
      .then((result) => res.json(result))
      .catch((error) => {
        console.log(error);
        res.status(500).json(error);
      });
  });

app.listen(port, () => {
  console.log(`Listen in http://localhost:${port}`);
});