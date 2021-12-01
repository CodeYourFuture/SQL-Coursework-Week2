const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;

const { Pool } = require("pg");
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "cyf_ecommerce",
  password: "",
  port: 5432,
});

app.get("/customers", function (req, res) {
  pool.query("SELECT * FROM customers", (error, result) => {
    res.json(result.rows);
  });
});

app.listen(PORT, () => {
  console.log(`Port running on ${PORT}`);
});
