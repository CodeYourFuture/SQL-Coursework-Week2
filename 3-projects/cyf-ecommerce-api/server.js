const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const { Pool } = require("pg");

const pool = new Pool({
  user: "stanliooo",
  host: "localhost",
  database: "cyf_ecommerce",
  password: "",
  port: 5432,
});

app.get("/customers", (req, res) => {
  pool.query("SELECT * FROM customers", (error, resault) => {
    res.json(resault.rows);
  });
});

app.get("/suppliers", (req, res) => {
  pool.query("SELECT * FROM suppliers", (error, resault) => {
    res.json(resault.rows);
  });
});

app.get("/products", (req, res) => {
  const selectQuery = `SELECT product_name, unit_price, supplier_name
                      FROM products
                      INNER JOIN product_availability ON product_availability.prod_id = products.id
                      INNER JOIN suppliers ON product_availability.supp_id  = suppliers.id; `;
  pool.query(selectQuery, (error, resault) => {
    res.send(resault.rows);
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
