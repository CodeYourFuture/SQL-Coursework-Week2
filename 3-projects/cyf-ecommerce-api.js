const express = require("express");
const { Pool } = require("pg");
require('dotenv').config()
const app = express();
const port = process.env.PORT || 5000;

// Configuring the database 
const pool = new Pool({
    user: 'farzad-nazif',
    host: 'localhost',
    database: 'cyf_ecommerce',
    password: '7633',
    port: 5432
});

// All customers
app.get("/customers", (req, res) => {
    pool
    .query("SELECT * FROM customers")
    .then((result) => res.json(result.rows))
    .catch((error) => {
      console.error(error);
      res.status(500).json(error);
    });
});

// All suppliers
app.get("/suppliers", (req, res) => {
    pool
    .query("SELECT * FROM suppliers")
    .then((result) => res.json(result.rows))
    .catch((error) => {
      console.error(error);
      res.status(500).json(error);
    });
});

app.listen(port, () => console.log(`Listening on port ${port}`));
