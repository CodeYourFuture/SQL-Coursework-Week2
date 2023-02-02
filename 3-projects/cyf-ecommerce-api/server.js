const express = require("express");
const app = express();
const { Pool } = require("pg");
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "cyf_ecommerce",
  password: "",
  port: 5432,
});

app.listen(3000, function () {
  console.log("Server is listening on port 3000. Ready to accept requests!");
});

// Get all customers
app.get("/customers", async function (req, res) {
  try {
    let result = await pool.query("SELECT * FROM customers");
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

// Get all suppliers
app.get("/suppliers", async function (req, res) {
  try {
    let result = await pool.query("SELECT * FROM suppliers");
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});
