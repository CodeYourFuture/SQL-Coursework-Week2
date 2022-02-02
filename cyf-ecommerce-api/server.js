const express = require("express");
const { Pool } = require("pg");

const app = express();

const dbConfig = {
  host: "localhost",
  port: 5432,
  user: "maria",
  password: "Perkins123",
  database: "cyf_ecommerce",
};

const pool = new Pool(dbConfig);


app.get("/customers", (req, res) => {
  pool.query("SELECT * FROM customers", (error, result) => {
    if (error) {
      res.status(500).send(error);
    } else {
      res.send(result.rows);
    }
  });
});


app.get("/suppliers", (req, res) => {
  pool.query("SELECT * FROM suppliers", (error, result) => {
    if (error) {
      res.status(500).send(error);
    } else {
      res.send(result.rows);
    }
  });
});


app.get("/products", (req, res) => {
  pool.query(
    'SELECT products.product_name, product_availability.unit_price, suppliers.supplier_name FROM product_availability INNER JOIN products ON product_availability.prod_id = products.id INNER JOIN suppliers ON product_availability.supp_id = suppliers.id;', 
    (error, result) => {
    if (error) {
      res.status(500).send(error);
    } else {
      res.send(result.rows);
    }
  });
});

app.listen(3000, () => console.log("Listening on port 3000."));
