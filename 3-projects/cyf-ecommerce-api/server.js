const express = require ("express");
const { Pool } = require("pg");

const app = express();


// const pool = new Pool({
//   user: "saman",
//   host: "localhost",
//   database: "cyf_ecommerce",
//   password: "1234",
//   port: 5432,
// });

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "postgres",
  password: "",
  port: 5432,
});

app.get("/customers", function (req, res) {
  pool
    .query("SELECT * FROM customers")
    .then((result) => res.json(result.rows))
    .catch((error) => {
      console.error(error);
      res.status(500).json(error);
    });
});

app.get("/suppliers", function (req, res) {
  pool
    .query("SELECT * FROM suppliers")
    .then((result) => res.json(result.rows))
    .catch((error) => {
      console.error(error);
      res.status(500).json(error);
    });
});


// app.get("/products", function (req, res) {
//   pool
//     .query("select product_name, unit_price as price, supplier_name from products "+ 
// "inner join product_availability on products.id = product_availability.prod_id "+ 
// "inner join suppliers on suppliers.id = product_availability.supp_id;")
//     .then((result) => res.json(result.rows))
//     .catch((error) => {
//       console.error(error);
//       res.status(500).json(error);
//     });
// });

app.get("/products", function (req, res) {
  pool
    .query(
      `select product_name, unit_price as price, supplier_name from products 
        inner join product_availability on products.id = product_availability.prod_id 
        inner join suppliers on suppliers.id = product_availability.supp_id;`
    )
    .then((result) => res.json(result.rows))
    .catch((error) => {
      console.error(error);
      res.status(500).json(error);
    });
});

app.listen(3005, function () {
  console.log("Server is listenening on port 3005, Ready to accept requests!");
});

