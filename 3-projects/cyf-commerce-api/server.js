const { Pool } = require("pg");
const express = require("express");
const app = express();

const pool = new Pool({
  host: "localhost",
  port: 5432,
  user: "codeyourfuture",
  password: process.env.db_password,
  database: "cyf_ecommerce"
});

app.get("/customers", async (req, res) => {
  const rs = await pool.query("SELECT * FROM customers");
  const customers = rs.rows;
  res.json(customers);
});

app.get("/suppliers", async (req, res) => {
  const rs = await pool.query("SELECT * FROM suppliers");
  const suppliers = rs.rows;
  res.json(suppliers);
});

const port = process.env.PORT || 3001;
app.listen(port, () => { console.log(`Listening on port ${port}...`); });