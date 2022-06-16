const express = require("express");
//const cors = require("cors");
const app = express();
//app.use(cors());

const PORT = 3001;
const { Pool } = require("pg");
const pool = new Pool({
  user: "tenny",
  host: "localhost",
  database: "cyf_ecommerce",
  password: "",
  port: 5432,
});

app.get("/customers", (req, res) => {
  const { search } = req.query;
  return pool
    .query("SELECT * FROM customers")
    .then((result) => res.send(result))
    .catch((error) => {
      console.log("an error just occurred");
      res.status(500).send("a problem occurred");
    });
});

app.get("/suppliers", (req, res) => {
  return pool
    .query("SELECT * FROM suppliers")
    .then((result) => res.send(result))
    .catch((error) => {
      console.log("an error just occurred");
      res.status(500).send("a problem occurred");
    });
});

app.get("/products", (req, res) => {
  return pool
    .query(
      "SELECT products.product_name, product_availability.unit_price, suppliers.supplier_name FROM products INNER JOIN product_availability ON products.id = product_availability.prod_id INNER JOIN suppliers ON product_availability.supp_id = suppliers.id"
    )
    .then((result) => res.send(result))
    .catch((error) => {
      console.log("an error just occurred");
      res.status(500).send("a problem occurred");
    });
});

app.listen(PORT, () => {
  console.log("Hey we are listening!");
});
