const express = require("express");
const app = express();

const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

// user: "postgres",
//   host: "localhost",
//   database: "cyf_ecommerce",
//   password: "",
//   port: 5432,

app.get("/customers", (req, res) => {
  pool
    .query("SELECT * FROM customers")
    .then((result) => {
      res.json(result.rows);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

app.get("/suppliers", (req, res) => {
  pool
    .query("SELECT * FROM suppliers")
    .then((result) => {
      res.json(result.rows);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

app.get("/products", (req, res) => {
  pool
    .query(
      "SELECT product_name,unit_price,supplier_name FROM products INNER JOIN product_availability as pa ON pa.prod_id=products.id INNER JOIN suppliers ON suppliers.id=pa.supp_id"
    )
    .then((result) => {
      res.json(result.rows);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

const port = process.env.PORT || 3000;

app.get("/", (req, res) => res.send("Hello World!"));
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
