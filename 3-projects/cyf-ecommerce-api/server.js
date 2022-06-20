const express = require("express");
const app = express();
const dbClient = require("./dbClient");

app.use(express.json());

app.get('/customers', (req, res) => {
     dbClient
       .query("SELECT * FROM customers")
       .then((result) => res.json(result.rows))
       .catch((error) => {
         console.error(error);
         res.status(500).json(error);
       });
})

app.get("/suppliers", (req, res) => {
  dbClient
    .query("SELECT * FROM suppliers")
    .then((result) => res.json(result.rows))
    .catch((error) => {
      console.error(error);
      res.status(500).json(error);
    });
});

app.get("/products", (req, res) => {
  dbClient
    .query(
      "SELECT p.product_name as productName, prod_avail.unit_price as unitPrice, s.supplier_name as supplierName FROM products p INNER JOIN product_availability prod_avail ON prod_avail.prod_id = p.id INNER JOIN suppliers s ON prod_avail.supp_id = s.id"
    )
    .then((result) => res.json(result.rows))
    .catch((error) => {
      console.error(error);
      res.status(500).json(error);
    });
});

const listener = app.listen(3000, function () {
    console.log('Your app is running on port ', 3000);
})