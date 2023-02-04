const express = require("express");
const app = express();
const { Pool } = require("pg");

app.listen(process.env.PORT || 3000, () => console.log("server started"));

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "cyf_ecommerce",
  password: "omid",
  port: 5432,
});

app.get("/customers", (req, res) => {
  pool
    .query(`SELECT * FROM customers`)
    .then((result) => res.json(result.rows))
    .catch((error) => {
      console.error(error);
      res.status(500).json(error);
    });
});

app.get("/suppliers", (req, res) => {
  pool
    .query(`SELECT * FROM suppliers`)
    .then((result) => res.json(result.rows))
    .catch((error) => {
      console.error(error);
      res.status(500).json(error);
    });
});

app.get("/products", (req, res) => {
  pool
    .query(`SELECT * FROM products`)
    .then((result) => res.json(result.rows))
    .catch((error) => {
      console.error(error);
      res.status(500).json(error);
    });
});
