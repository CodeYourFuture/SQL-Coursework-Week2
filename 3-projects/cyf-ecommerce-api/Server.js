const express = require('express');
const app = express();
app.use(express());

const { Pool } = require('pg');

const pool = new Pool({
  user: "remen",
  host: "localhost",
  database: "cyf_ecommerce",
  password: "",
  port: 5432,
});

app.get ("/customers", (req, res) =>{
    pool.query("SELECT * FROM customers", (error, result) => {
    console.log(error)
    res.json(result.rows);
  });
});

app.get("/suppliers", (req, res) => {
  pool.query("SELECT * FROM suppliers", (error, result) => {
    console.log(error);
    res.json(result.rows);
  });
});

app.get("/products", (req, res) => {
  pool.query("SELECT * FROM products", (error, result) => {
    console.log(error);
    res.json(result.rows);
  });
});

const PORT = 5000;
app.listen(PORT, (req, res) =>{
    console.log(`Listening on Port ${PORT}`)
});
