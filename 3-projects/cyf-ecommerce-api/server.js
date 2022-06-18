const express = require("express");
const app = express();
const PORT = 3000;
const { Pool } = require("pg");

const pool = new Pool({
  user: "helen",
  host: "localhost",
  database: "cyf_ecommerce",
  password: "01234",
  port: 5678,
});

app.get("/", (req, res) => {
  res.json({ info: "Node.js, Express, and Postgres API" });
});

const getCustomers = (req, res) => {
  return pool
    .query("SELECT * FROM customers")
    .then((result) => res.json(result.rows))
    .catch((error) => {
      console.error(error);
      res.status(500).json(error);
    });
};

const getSuppliers = (req, res) => {
  return pool
    .query("SELECT * FROM suppliers")
    .then((result) => res.json(result.rows))
    .catch((error) => {
      console.error(error);
      res.status(500).json(error);
    });
};

const getProducts = (req, res) => {
  return pool
    .query(
      "SELECT products.product_name, product_availability.unit_price, suppliers.supplier_name FROM product_availability INNER JOIN products ON products.id=product_availability.prod_id LEFT JOIN suppliers ON suppliers.id=product_availability.supp_id"
    )
    .then((result) => res.json(result.rows))
    .catch((error) => {
      console.error(error);
      res.status(500).json(error);
    });
};
app.get("/customers", getCustomers);
app.get("/suppliers", getSuppliers);
app.get("/products", getProducts);

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}.`);
});
