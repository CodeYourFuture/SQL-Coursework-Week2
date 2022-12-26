const express = require("express");
const app = express();
const PORT = 3001;

const { Pool } = require("pg");

const pool = new Pool({
  user: "shafiekd",
  host: "dpg-cejjhsda4991ihn66lh0-a.oregon-postgres.render.com",
  database: "cyf_ecommerce_adtl",
  password: "Mq4Sdd8pmyho22HmecVpEuozupgY64U3",
  port: 5432,
  ssl: {
    rejectUnauthorized: false,
  },
});

//Return all customers

app.get("/customers", function (req, res) {
  pool
    .query("SELECT * FROM customers")
    .then((result) => res.json(result.rows))
    .catch((error) => {
      console.error(error);
      res.status(500).json(error);
    });
});

//return all suppliers

app.get("/suppliers", function (req, res) {
  pool
    .query("SELECT * FROM suppliers")
    .then((result) => res.json(result.rows))
    .catch((error) => {
      console.error(error);
      res.status(500).json(error);
    });
});

app.listen(PORT, function () {
  console.log(`listening on ${PORT}`);
});
