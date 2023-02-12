const express = require("express");
const app = express();
const { Pool } = require("pg");

const db = new Pool({
  user: "fatih",
  host: "localhost",
  database: "cyf_ecommerce",
  password: "1",
  port: 5432,
});

app.get("/customers", (req, res) => {
  db.query("select * from customers", (err, result) => {
    res.json(result.rows);
  });
});

app.get("/suppliers", (req, res) => {
  db.query("select * from suppliers", (err, result) => {
    res.json(result.rows)
  })
})
app.listen(3000, function () {
  console.log("Server is listening on port 3000. Ready to accept requests!");
});
