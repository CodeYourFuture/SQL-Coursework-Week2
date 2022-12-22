const express = require("express");
const app = express();
const port = process.env.PORT || 3001;
const { Pool } = require("pg");

const pool = new Pool({
  user: "riyaaz",
  host: "dpg-cefmi99gp3jk7mhomnhg-a.oregon-postgres.render.com",
  database: "cyf_ecommerce_i43p",
  password: "m35aBThruz4miC9Ak7Hsjdwgwy5qlxBt",
  port: 5432,
  ssl: { rejectUnauthorized: false },
});

app.get("/customers", (req, res) => {
  pool
    .query("SELECT * from customers c")
    .then((result) => res.json(result.rows))
    .catch((error) => {
      console.error(error);
      res.status(500).json(error);
    });
});

app.get("/suppliers", (req, res) => {
  pool
    .query("SELECT * from suppliers s")
    .then((result) => res.json(result.rows))
    .catch((error) => {
      console.error(error);
      res.status(500).json(error);
    });
});

app.listen(port, function () {
  console.log(
    `Server is listening on port ${port}. Ready to accept requests!`
  );
});
