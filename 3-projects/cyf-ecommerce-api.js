const express = require("express");

const { Pool } = require("pg");
const app = express();

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "cyf-ecommerce-api",
  password: "Lidya2021",
  port: 5432,
});

app.get("/customers", (req, res) => {
  connection.query("SELECT * FROM customers", (err, rows) => {
    res.send(Object.values(rows));
  });
});

app.get("/suppliers", (req, res) => {
  connection.query("SELECT * FROM suppliers", (err, rows) => {
    res.send(Object.values(rows));
  });
});

app.listen(3000, function () {
  console.log("Server is listening on port 3000. Ready to accept requests!");
});
