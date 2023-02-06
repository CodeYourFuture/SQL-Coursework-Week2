const express = require("express");
const app = express();
const dotenv = require("dotenv");
const { Pool } = require("pg");
const PORT = process.env.PORT || 5000;

dotenv.config();
app.use(express.json());

const pool = new Pool({
  user: process.env.USEER,
  password: process.env.PASSWORD,
  database: "cyf_ecommerce",
  host: "localhost",
  port: 5432,
});

app.get("/", (req, res) => {
  res.send("An e-commerce API");
});

app.get("/customers", (req, res) => {
  pool
    .query("SELECT * FROM customers")
    .then(() => res.json())
    .then((data) => res.send(data.rows))
    .catch((err) => {
      console.log(err);
      res.status(500).send(err);
    });
  return;
});

app.get("/suppliers", (req, res) => {
  pool
    .query("SELECT * FROM suppliers")
    .then(() => res.json())
    .then((data) => res.send(data.rows))
    .catch((err) => {
      console.log(err);
      res.status(500).send(err);
    });
  return;
});

app.get("/products", (req, res) => {
  const productsQuery =
    "SELECT p.product_name, a.prod_id, a.supp_id, a.unit_price FROM product_availability a JOIN products p ON (p.id = a.prod_id)";
  pool
    .query(productsQuery)
    .then(() => res.json())
    .then((data) => res.send(data.rows))
    .catch((err) => {
      console.log(err);
      res.status(500).send(err);
    });
  return;
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
