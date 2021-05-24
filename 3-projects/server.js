const express = require("express");
const { Pool } = require("pg");
const app = express();
const dbConfig = {
  host: "localhost",
  port: 5432,
  user: "cyf", // when run from local, change to your computer username
  password: "C0d3Y0urFutur3", // with your computer password
  database: "cyf_ecommerce",
};
const pool = new Pool(dbConfig);

// get all customers data
const customersSelectQuery = `
SELECT * 
FROM customers`;

// get all suppliers data 
const suppliersSelectQuery = `
SELECT * 
FROM suppliers`;

// get all product names, their prices and suppliers names
const productsSelectQuery = `
SELECT a.product_name,
    c.unit_price,
    supplier_name
FROM products AS a
    INNER JOIN order_items AS b ON a.id = b.product_id
    INNER JOIN product_availability AS c ON b.product_id = c.prod_id
    INNER JOIN suppliers AS d ON b.supplier_id = d.id`;

// customers data endpoint
app.get("/customers", (req, res) =>
  pool
    .query(customersSelectQuery)
    .then((result) => res.send(result.rows))
    .catch((error) => res.status(500).send(error))
);

// suppliers data endpoint
app.get("/suppliers", (req, res) =>
  pool
    .query(suppliersSelectQuery)
    .then((result) => res.send(result.rows))
    .catch((error) => res.status(500).send(error))
);

// products data endpoint
app.get("/products", (req, res) =>
  pool
    .query(productsSelectQuery)
    .then((result) => res.send(result.rows))
    .catch((error) => res.status(500).send(error))
);

app.listen(5000, () => console.log("Running on port 5000"));
