const express = require("express");
const app = express();

app.use(express.static("public"));

const { Pool } = require("pg");

const db = new Pool({
  user: "postgres",
  host: "localhost",
  database: "cyf_ecommerce",
  password: "password",
  port: 5432,
});

app.get("/customers", (req, res) => {
  db.query("SELECT * FROM customers")
    .then((result) => {
      res.json(result.rows);
    })
    .catch((error) => {
      console.log(error);
    });
});

app.get("/suppliers", (req, res) => {
  db.query("SELECT * FROM suppliers")
    .then((result) => {
      res.json(result.rows);
    })
    .catch((error) => {
      console.log(error);
    });
});

app.get("/products", (req, res) => {
  db.query(
    `SELECT
      p.product_name, 
      pa.unit_price, 
      s.supplier_name
    FROM product_availability pa
    INNER JOIN products p
    ON (pa.prod_id = p.id)
    INNER JOIN suppliers s
    ON (pa.supp_id = s.id)
    ORDER BY p.product_name, pa.unit_price;`
  )
    .then((result) => {
      res.json(result.rows);
    })
    .catch((error) => {
      console.log(error);
    });
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "./public/index.html");
});

app.listen(3000, () => {
  console.log("The server is running on port 3000");
});
