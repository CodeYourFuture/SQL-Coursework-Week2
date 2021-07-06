const express = require("express");
const db = require("./db");
const app = express();

require("dotenv").config();

app.get("/", function (req, res) {
  res.json({
    endpoints: ["/customers", "/suppliers", "/products"],
  });
});

app.get("/customers", function (req, res) {
  db.query("SELECT * FROM customers", (db_err, db_res) => {
    if (db_err) {
      res.status(502).send(db_err);
    } else {
      res.json(db_res.rows);
    }
  });
});

app.get("/suppliers", function (req, res) {
  db.query("SELECT * FROM suppliers", (db_err, db_res) => {
    if (db_err) {
      res.status(502).send(db_err);
    } else {
      res.json(db_res.rows);
    }
  });
});

app.get("/products", function (req, res) {
  const sqlCommand = `SELECT p.product_name, pa.unit_price, s.supplier_name
                 FROM products p
                 INNER JOIN product_availability pa ON p.id = pa.prod_id
                 INNER JOIN suppliers s ON pa.supp_id = s.id`;
  db.query(sqlCommand, (db_err, db_res) => {
    if (db_err) {
      res.status(502).send(db_err);
    } else {
      res.json(db_res.rows);
    }
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Start server on port: ${PORT}`));