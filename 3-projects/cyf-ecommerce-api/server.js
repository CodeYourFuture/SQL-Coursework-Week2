const express = require("express");
const app = express();
const { Pool } = require("pg");

const pool = new Pool({
  user: "Ryno",
  host: "localhost",
  database: "cyf_ecommerce",
  password: "16139",
  port: 5432,
});

app.get("/customers", function (req, res) {
  pool.query("SELECT * FROM customers", (error, result) => {
    res.json(result.rows);
  });
});

app.get("/customers/:id", function (req, res) {
  let id = req.params.id;

  pool.query("SELECT * FROM customers WHERE id=$1", [id])
  .then(result => res.json(result.rows))
  .then(e => console.error(e));
})

// app.post("/customers", function (req, res) {

// })

app.get("/suppliers", (req, res) => {
  pool.query("SELECT * FROM suppliers", (error, result) => {
    res.json(result.rows);
  });
});

app.get("/products", (req, res) => {
  pool.query(
    "SELECT product_name, unit_price, supplier_name FROM products INNER JOIN product_availability ON product_availability.prod_id = products.id INNER JOIN suppliers ON suppliers.id = product_availability.supp_id",
    (error, result) => {
      res.json(result.rows);
    }
  );
});

// app.post("/products", function (req, res) {
  
// })

const listener = app.listen(3000 || process.env.PORT, () => {
  console.log("Server is listening on port " + listener.address().port);
});
