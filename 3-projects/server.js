const express = require("express");
const app = express();
require("dotenv").config();

const { Pool } = require("pg");

const port = 4000;

// Database configuration setup
const dbConfig = {
  host: "localhost",
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  port: 5432,
  database: "cyf_ecommerce",
};

// Connecting to database server
const pool = new Pool(dbConfig);

// SQL query to return all the customers from the database
const getAllCustomers = `SELECT * FROM customers`;

// SQL query to return all the suppliers from the database
const getAllSuppliers = `SELECT * FROM suppliers`;

// SQL query to return all the product names along with their prices and supplier names from the database
const getAllProduct = `SELECT product_name, unit_price, supplier_name from products 
	INNER JOIN product_availability ON product_availability.prod_id = products.id
	INNER JOIN suppliers ON suppliers.id = product_availability.supp_id`;

app.get("/cyf-ecommerce-api", (req, res) => {
  res.send("<center><h1>Welcome to CYF E - Commerce API</h1><p>/customers - to see all customers<br/>/suppliers - to see all suppliers<br/>/products - to see all products</p></center>");
});

// GET request endpoint for all customers
app.get("/cyf-ecommerce-api/customers", (req, res) => {
  pool
    .query(getAllCustomers)
    .then((result) => res.send(result.rows))
    .catch((error) => res.status(500).send(error));
});

// GET request endpoint for all suppliers
app.get("/cyf-ecommerce-api/suppliers", (req, res) => {
  pool
    .query(getAllSuppliers)
    .then((result) => res.send(result.rows))
    .catch((error) => res.status(500).send(error));
});

// GET request endpoint for all products
app.get("/cyf-ecommerce-api/products", (req, res) => {
  pool
    .query(getAllProduct)
    .then((result) => res.send(result.rows))
    .catch((error) => res.status(500).send(error));
});

app.listen(port, () => {
  console.log(`App is listening on http://localhost:${port}`);
});
