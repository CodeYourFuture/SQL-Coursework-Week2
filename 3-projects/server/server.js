const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 5000;
const bodyparser = require("body-parser");

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(cors());

const { Pool } = require("pg");

const pool = new Pool({
  user: "ika",
  host: "localhost",
  database: "cyf_ecommerce",
  password: "****",
  port: 5432,
});

//gets customers
app.get("/", function (req, res) {
  pool
    .query("SELECT * FROM customers")
    .then((result) => res.json(result.rows))
    .catch((error) => {
      console.log(error);
      res.status(500).json(error);
    });
});

//gets suppliers
app.get("/suppliers", function (req, res) {
  pool
    .query("SELECT * FROM suppliers")
    .then((result) => res.json(result.rows))
    .catch((error) => {
      console.log(error);
      res.status(500).json(error);
    });
});

app.get("/products", function (req, res) {
  pool
    .query(
      "SELECT products.product_name, suppliers.supplier_name, product_availability.unit_price FROM product_availability INNER JOIN  products ON product_availability.prod_id = products.id INNER JOIN  suppliers ON product_availability.supp_id = suppliers.id;"
    )
    .then((result) => res.json(result.rows))
    .catch((error) => {
      console, log(error);
      res.status(500).json(error);
    });
});

app.listen(port, () => console.log(`Listening on port ${port}`));
