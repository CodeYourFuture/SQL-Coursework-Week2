const express = require("express");

const { Pool } = require("pg");
const app = express();
const PORT = process.env.PORT || 5000;

const pool = new Pool({
  user: "shadab",
  host: "localhost",
  database: "cyf_ecommerce",
  password: "1988",
  port: 5432,
});

app.get("/", (req, res) => res.send("Server is running!"));

app.get("/customers", (req, res) => {
  pool
    .query("SELECT * FROM customers")
    .then((result) => res.json(result.rows))
    .catch((er) => {
      console.log(er);
      res.status(500).json(er);
    });
});
app.get("/suppliers", (req, res) => {
  pool
    .query("SELECT * FROM suppliers")
    .then((result) => res.json(result.rows))
    .catch((er) => {
      console.log(er);
      res.status(500).send(er);
    });
});

app.listen(PORT, () => console.log(`App is running on ${PORT}`));
