
const express = require("express");
const app = express();
const port = 5000;

app.use(express.json());

const { Pool } = require("pg");

const pool = new Pool({
  user: "migue",
  host: "localhost",
  database: "cyf_ecommerce",
  password: "Cyf2022",
  port: 5432,
});

// Add a new GET endpoint `/customers`

app.get("/customers", function(req, res) {
  pool.query('SELECT * FROM customers')
      .then((result) => res.json(result.rows))
      .catch((error) => {
          console.error(error);
          res.status(500).json(error);
      });
});

// get customers by id
app.get("/customers/:id", function (req, res) {
  const customerId = req.params.id;

  pool
    .query("SELECT * FROM customers WHERE id=$1", [customerId])
    .then((result) => res.json(result.rows))
    .catch((error) => {
      console.error(error);
      res.status(500).json(error);
    });
});

// Add a new GET endpoint `/suppliers`
app.get("/suppliers", function(req, res){
  pool.query("SELECT * FROM suppliers")
  .then((result) => res.json(result.rows))
      .catch((error) => {
          console.error(error);
          res.status(500).json(error);
      });
})

//Add a new GET endpoint `/products`
app.get("/products", function(req, res){
  pool.query(`SELECT products.product_name, product_availability.unit_price, suppliers.supplier_name
  FROM products
  INNER JOIN product_availability
  ON products.id = product_availability.prod_id
  INNER JOIN suppliers
  ON product_availability.supp_id = suppliers.id;`)
  .then((result) => res.json(result.rows))
      .catch((error) => {
          console.error(error);
          res.status(500).json(error);
      });


})









app.listen(port, () => {
  console.log(`server is running ${port}`);
});