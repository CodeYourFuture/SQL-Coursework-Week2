const express = require("express");
const app = express();
app.use(express.json());
const { Pool } = require("pg");
const pool = new Pool({
  user: "timea",
  host: "localhost",
  database: "cyf_ecommerce",
  password: "password",
  post: 5432,
});

app.get("/customers", (req, res) => {
  pool.query("SELECT * FROM customers").then((result) => res.send(result));
});

app.get("/suppliers", (req, res) => {
  pool.query("SELECT * FROM suppliers").then((result) => res.send(result));
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log("listening on port 3000");
});
