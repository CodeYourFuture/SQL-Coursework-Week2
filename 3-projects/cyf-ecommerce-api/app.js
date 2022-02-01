const express = require("express");
const app = express();
const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "cyf_ecommerce",
  password: "mulindI12",
  port: 5432,
});

app.get("/customers", function (req, res) {
  pool.query("SELECT * from customers", (error, result) => {
    res.json(result.rows);
  });
});
app.get("/suppliers", function (req, res) {
  pool.query("SELECT * from suppliers", (error, result) => {
    res.json(result.rows);
  });
});
app.get("/products", function (req, res) {
  pool.query(
    `select products.product_name, product_availability.unit_price, suppliers.supplier_name from products 
    inner join product_availability on product_availability.prod_id = products.id 
    inner join suppliers on suppliers.id = product_availability.supp_id`,
    (error, result) => {
      res.json(result.rows);
    }
  );
});

app.listen(3000, function () {
  console.log("Server is listening on port 3000. Ready to accept requests!");
});
