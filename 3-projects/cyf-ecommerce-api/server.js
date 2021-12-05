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
  })
})

app.get

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
