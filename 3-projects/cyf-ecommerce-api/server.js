const express = require("express");
const app = express();
//to create a new pool with configuration
const { Pool } = require("pg");
const pool = new Pool({
  user: "amarachi",
  host: "localhost",
  database: "cyf_ecommerce",
  password: "1Natasha+",
  port: 5432,
});
//to return all customers
app.get("/customers", function (req, res) {
  pool.query("SELECT * FROM customers")
      .then((result) => res.json(result.rows))
      .catch((error) => {
      console.error(error);
      res.status(500).json(error);
    });
});
//to return all suppliers
app.get("/suppliers", function (req, res) {
  pool.query("SELECT * FROM suppliers")
      .then((result) => res.json(result.rows))
      .catch((error) => {
      console.error(error);
      res.status(500).json(error);
    });
});
//to return all the product names along with their prices and supplier names.
const productSelect= "SELECT products.product_name,suppliers.supplier_name,product_availability.unit_price" +
" FROM products INNER JOIN product_availability ON products.id = product_availability.prod_id" +
" INNER JOIN suppliers ON suppliers.id =  product_availability.supp_id"
app.get("/products", function (req, res) {
  pool
    .query(productSelect)
    .then((result) => res.json(result.rows))
    .catch((error) => {
      console.error(error);
      res.status(500).json(error);
    });
});
app.listen(3004, function () {
  console.log("Server is listening on port 3004. Ready to accept requests!");
});