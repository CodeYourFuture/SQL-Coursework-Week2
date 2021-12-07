const express = require("express");
const app = express();

const { Pool } = require("pg");

const pool = new Pool({
  user: "andy",
  host: "localhost",
  database: "cyf-ecommerce-api",
  password: "*****",
  port: 5432,
});

// Return all the customers from the database
app.get("/customers", (req, res) => {
  pool.query("SELECT * FROM customers", (error, result) => {
    error
      ? res.status(400).json({ success: false })
      : res.status(200).json(result.rows);
  });
});

// Return all the suppliers from the database
app.get("/suppliers", (req, res) => {
  pool.query("SELECT * FROM suppliers", (error, result) => {
    error
      ? res.status(400).json({ success: false })
      : res.status(200).json(result.rows);
  });
});

// Is it ok to use literal syntax here or is there a better way to store/display a query, declare it as a variable first maybe?
// Return all the product names along with their prices and supplier names
app.get("/products", (req, res) => {
  pool.query(
    `select
  p.product_name,
  pa.unit_price as price,
  s.supplier_name
from
  products as p
  inner join product_availability as pa on p.id = pa.prod_id
  inner join suppliers as s on pa.supp_id = s.id;`,
    (error, result) => {
      console.log(error);
      error
        ? res.status(400).json({ success: false })
        : res.status(200).json(result.rows);
    }
  );
});

app.listen(3000, () => {
  console.log("Server is listening on port 3000. Ready to accept requests!");
});
