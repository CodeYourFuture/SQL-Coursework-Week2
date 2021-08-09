const express = require("express");
const app = express();
const { Pool } = require("pg");

const pool = new Pool({
  user: "Ryno",
  host: "localhost",
  database: "cyf_ecommerce",
  password: "16139",
  port: 5432,
});

app.get("/customers", function (req, res) {
  pool.query("SELECT * FROM customers", (error, result) => {
    res.json(result.rows);
  });
});

app.get("/suppliers", (req, res) => {
  pool.query("SELECT * FROM suppliers", (error, result) => {
    res.json(result.rows);
  });
});

const listener = app.listen(3000 || process.env.PORT, () => {
  console.log("Server is listening on port " + listener.address().port);
});
