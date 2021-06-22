const express = require("express");
const app = express();

app.listen(3000, function () {
  console.log("Server is listening on port 3000. Ready to accept requests!");
});

const { Pool } = require("pg");
const pool = new Pool({
  user: "morteza",
  host: "localhost",
  database: "cyf_ecommerce",
  password: "",
  port: 5432,
});

app.get("/customers", function (req, res) {
  pool.query("select * from customers", (error, result) => {
    res.json(result.rows);
  });
});

app.get("/suppliers", function (req, res) {
  pool.query("select * from suppliers", (error, result) => {
    res.json(result.rows);
  });
});

app.get("/products", function (req, res) {
  pool.query(
    " select product_name,unit_price,supplier_name from products inner join product_availability on products.id=product_availability.prod_id inner join suppliers on suppliers.id=product_availability.supp_id;",
    (error, result) => {
      res.json(result.rows);
    }
  );
});
