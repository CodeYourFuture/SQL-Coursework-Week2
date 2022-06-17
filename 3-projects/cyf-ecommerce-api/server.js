const express = require("express");
const cors = require("cors");
const app = express();

const { Pool } = require("pg");

const pool = new Pool({
  user: "saf",
  host: "localhost",
  database: "cyf_ecommerce",
  password: "pqwfhy348",
  port: 5432,
});

app.use(cors());

const PORT = 8080;

//
app.get("/customers", function (req, res) {
  pool
    .query("SELECT * FROM customers")
    .then((result) => res.send(result))
    .catch((error) => {
      console.error(error);
      res.status(500).json(error);
    });
});

app.get("/suppliers", function (req, res) {
  pool
    .query("SELECT * FROM suppliers")
    .then((result) => res.send(result))
    .catch((error) => {
      console.error(error);
      res.status(500).json(error);
    });
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}. Ready to accept requests!`);
});
