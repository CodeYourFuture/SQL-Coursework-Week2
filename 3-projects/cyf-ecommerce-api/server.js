const express = require("express");
const { Pool } = require("pg");

const app = express();

// Specify the connection parameters in an object
const dbConfig1 = {
  host: "localhost",
  port: 5432,
  user: "codeyourfuture",
  password: "codeyourfuture",
  database: "cyf_ecommerce",
};

// Specify the connection parameters as a connection URL
const dbConfig2 = {
  connectionString:
    "postgresql://codeyourfuture:codeyourfuture@localhost:5432/cyf_ecommerce",
};

// Create a connection pool to the DB server
const pool = new Pool(dbConfig1);

const allCustomersSelectQuery = `SELECT * FROM customers`;

const allSuppliersSelectQuery = `SELECT * FROM suppliers`;

const allProductsSelectQuery = `SELECT p.product_name, pa.unit_price, s.supplier_name 
FROM products p
INNER JOIN product_availability pa 
ON p.id = pa.prod_id 
INNER JOIN  suppliers s
ON s.id = pa.supp_id;`;

//allCustomers GET
app.get("/customers", (req, res) =>
  // Query with callback
  pool.query(allCustomersSelectQuery, (error, result) => {
    if (error) {
      res.status(500).send(error);
    } else {
      res.send(result.rows);
    }
  })
);

//allSuppliers GET
app.get("/suppliers", (req, res) =>
  // Query with callback
  pool.query(allSuppliersSelectQuery, (error, result) => {
    if (error) {
      res.status(500).send(error);
    } else {
      res.send(result.rows);
    }
  })
);

//allProducts with price & supplier GET
app.get("/products", (req, res) =>
  // Query with callback
  pool.query(allProductsSelectQuery, (error, result) => {
    if (error) {
      res.status(500).send(error);
    } else {
      res.send(result.rows);
    }
  })
);

app.listen(3000, () => console.log("Listening on port 3000."));
