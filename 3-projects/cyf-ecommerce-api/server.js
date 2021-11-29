const express = require("express");
const app = express();

app.listen(3000, function () {
  console.log("Server is listening on port 3000. Ready to accept requests!");
});
const { Pool } = require("pg");

const pool = new Pool({
  user: "asif",
  host: "localhost",
  database: "cyf_ecommerce",
  password: "786god",
  port: 5432,
});

app.get("/customers", function (req, res) {
  pool.query("SELECT * FROM customers", (error, result) => {
    res.status(200).json(result.rows);
  });
});
app.get("/suppliers", function (req, res) {
  pool.query("SELECT * FROM suppliers", (error, result) => {
    res.status(200).json(result.rows);
  });
});

app.get("/products", function (req, res) {
  pool.query(
    "select products.product_name, product_availability.unit_price,suppliers.supplier_name from products inner join product_availability on products.id=product_availability.prod_id inner join suppliers on product_availability.supp_id=suppliers.id;",

    (error, result) => {
      res.status(200).json(result.rows);
    }
  );
});
