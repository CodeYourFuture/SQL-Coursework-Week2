const express = require("express");
const app = express();
const { Pool } = require("pg");

const db = new Pool({
  user: "nabwa",
  host: "localhost",
  database: "cyf_ecommerce",
  password: "",
  port: 5432,
});

app.get("/customers", function (req, res) {
  db.query("SELECT * FROM customers", (error, result) => {
    res.json(result.rows);
  });
});

app.get("/suppliers", function (req, res) {
  db.query("SELECT * FROM suppliers", (error, result) => {
    res.json(result.rows);
  });
});

app.get("/products", (req, res) => {
  db.query(
    "select p.product_name, p_a.unit_price,s.supplier_name from products p join product_availability p_a on (p.id = p_a.prod_id) join suppliers s on (s.id = p_a.supp_id)",
    (err, result) => {
      res.json(result.rows);
    }
  );
});

app.listen(8080, function () {
  console.log("Server is listening on port 8080.");
});
