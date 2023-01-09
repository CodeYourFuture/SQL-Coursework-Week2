const express = require("express");
const app = express();

const port = process.env.PORT || 3001;

const { Pool } = require('pg');

const pool = new Pool({
  user: 'alexjora',
  host: 'dpg-cet8da9a6gdut0o9m4p0-a.oregon-postgres.render.com',
  database: 'cyf_ecommerce_sist',
  password: '87S9xLjsgG7dotKmhz0vcCh6MmGyUW7V',
  port: 5432,
  ssl: {
    rejectUnauthorized: false
  }
});

app.get("/customers", function (req, res) {
  pool.query('SELECT * FROM customers')
    .then((result) => res.json(result.rows))
    .catch((error) => {
      console.error(error);
      res.status(500).json(error);
    });
});

app.get("/suppliers", function (req, res) {
  pool.query('SELECT * FROM suppliers')
    .then((result) => res.json(result.rows))
    .catch((error) => {
      console.error(error);
      res.status(500).json(error);
    });
});

app.get("/products", function (req, res) {
  pool.query('SELECT p.product_name , pa.unit_price , s.supplier_name FROM products p INNER JOIN product_availability pa ON p.id = pa.prod_id INNER JOIN suppliers s ON pa.supp_id = s.id')
    .then((result) => res.json(result.rows))
    .catch((error) => {
      console.error(error);
      res.status(500).json(error);
    });
});

app.listen(port, function () {
  console.log(`Server is listening on port ${port}.`);
});