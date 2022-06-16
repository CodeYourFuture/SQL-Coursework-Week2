const express = require("express");
require('dotenv').config()
const app = express();
const { Pool } = require("pg");

const pool = new Pool({
  user: process.env.SQL_USERNAME,
  host: "localhost",
  database: "cyf_ecommerce",
  password: process.env.SQL_PASSWORD,
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

app.listen(process.env.PORT, () => {
  console.log(`Listen in http://localhost:${process.env.PORT}`);
});